import amqplib from 'amqplib';
import Router from './router';
import * as enums from '../../enums';
import { NotConnectedError } from '../../errors';
import getConfig from '../../tools/configLoader';
import Log from '../../tools/logger';
import type * as types from '../../types';

export default class Broker {
  private _retryTimeout!: NodeJS.Timeout;
  private _connection: amqplib.Connection | undefined;
  private _connectionTries = 0;
  private _channel: amqplib.Channel | undefined;
  private _channelTries = 0;
  private _queue: Record<string, types.IRabbitMessage> = {};
  private readonly _router: Router;

  constructor() {
    this._router = new Router();
  }

  private get router(): Router {
    return this._router;
  }

  init(): void {
    this.initCommunication();
  }

  send(userId: string, payload: unknown, target: enums.EMessageTypes): void {
    const body = { ...this._queue[userId], payload, target };
    delete this._queue[userId];
    if (!this._channel) throw new NotConnectedError();
    this._channel.publish(enums.EAmqQueues.Gateway, '', Buffer.from(JSON.stringify(body)));
  }

  close(): void {
    if (!this._connection) return;

    this._connection
      .close()
      .then(() => {
        if (this._retryTimeout) clearTimeout(this._retryTimeout);
        this.cleanAll();
      })
      .catch(() => null);
  }

  private sendHeartbeat(payload: unknown, target: enums.EMessageTypes): void {
    const body = { payload, target };
    if (!this._channel) throw new NotConnectedError();
    this._channel.publish(enums.EAmqQueues.Gateway, '', Buffer.from(JSON.stringify(body)));
  }

  private reconnect(): void {
    this.close();
    this.initCommunication();
  }

  private initCommunication(): void {
    if (this._connectionTries++ > parseInt(Number(enums.ERabbit.RetryLimit).toString())) {
      Log.error('Rabbit', 'Gave up connecting to rabbit. Is rabbit dead?');
      throw new Error('Gave up connecting to rabbit. Is rabbit dead?');
    }

    amqplib
      .connect(getConfig().amqpURI)
      .then((connection) => {
        Log.log('Rabbit', 'Connected to rabbit');
        this._connection = connection;
        connection.on('close', () => this.close());
        connection.on('error', () => this.reconnect());
        this.createChannels();
      })
      .catch((err) => {
        const error = err as types.IFullError;
        Log.warn('Rabbit', 'Error connecting to RabbitMQ, retrying in 1 second');
        Log.error('Rabbit', error.message, error.stack);
        this._retryTimeout = setTimeout(() => this.initCommunication(), 1000);
        return (this._connection = undefined);
      });
  }

  private createChannels(): void {
    if (this._channel) return;
    if (!this._connection) throw new NotConnectedError();
    if (this._channelTries++ > parseInt(Number(enums.ERabbit.RetryLimit).toString())) {
      Log.error('Rabbit', 'Error creating rabbit connection channel, stopped retrying');
    }

    this._connection
      .createChannel()
      .then((channel) => {
        Log.log('Rabbit', 'Channel connected');
        this._channel = channel;
        channel.on('close', () => this.cleanAll());
        channel.on('error', () => this.reconnectChannel());
        return this.createQueue();
      })
      .catch((err) => {
        const error = err as types.IFullError;
        Log.error('Rabbit', error.message, error.stack);
        Log.error(
          'Rabbit',
          `Error creating rabbit connection channel, retrying in 1 second: ${(err as types.IFullError).message}`,
        );
        this._retryTimeout = setTimeout(() => this.createChannels(), 1000);
        return (this._channel = undefined);
      });
  }

  private async createQueue(): Promise<void> {
    Log.log('Rabbit', `Creating queue: ${enums.EAmqQueues.Gateway}`);
    Log.log('Rabbit', `Creating queue: ${enums.EAmqQueues.Story}`);

    await this._channel!.assertQueue(enums.EAmqQueues.Gateway, { durable: true });
    await this._channel!.assertQueue(enums.EAmqQueues.Story, { durable: true });
    await this._channel!.consume(
      enums.EAmqQueues.Story,
      (message) => {
        if (!message) return;
        const payload = JSON.parse(message.content.toString()) as types.IRabbitMessage;
        if (payload.target === enums.EMessageTypes.Heartbeat) {
          this.sendHeartbeat(enums.EServices.Story, enums.EMessageTypes.Heartbeat);
        } else {
          this._queue[payload.user.tempId] = payload;
          this.errorWrapper(async () => this.router.handleMessage(payload), payload.user.tempId);
        }
      },
      { noAck: true },
    );
    return this.sendHeartbeat(enums.EServices.Story, enums.EMessageTypes.Heartbeat);
  }

  private async closeChannel(): Promise<void> {
    if (this._retryTimeout) {
      clearTimeout(this._retryTimeout);
    }
    await this._channel!.purgeQueue(enums.EAmqQueues.Story);
    await this._channel!.deleteQueue(enums.EAmqQueues.Story);

    await this._channel!.close().catch(() => null);
    this._channel = undefined;
    this._channelTries = 0;
  }

  private reconnectChannel(): void {
    Log.error('Rabbit', 'Got err. Reconnecting');
    this.closeChannel()
      .then(() => {
        this.createChannels();
      })
      .catch((err) => {
        const error = err as types.IFullError;
        Log.error('Rabbit', "Couldn't create channels");
        return Log.error('Rabbit', error.message, error.stack);
      });
  }

  private cleanAll(): void {
    this._channel = undefined;
    this._connection = undefined;
    this._connectionTries = 0;
    this._channelTries = 0;
    clearTimeout(this._retryTimeout);
  }

  private errorWrapper(func: () => Promise<void>, user: string): void {
    func().catch((err) => {
      const { message, name, code, status, stack } = err as types.IFullError;
      Log.error('Modules', 'Generic err', message, stack);
      if (!status) {
        this.send(user, { message, name, code, status: 500 }, enums.EMessageTypes.Error);
      } else {
        this.send(user, { message, name, code, status }, enums.EMessageTypes.Error);
      }
    });
  }
}
