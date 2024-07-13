import Handler from './handler';
import * as enums from '../../enums';
import * as errors from '../../errors';
import Log from '../../tools/logger';
import type * as types from '../../types';

export default class Router {
  private readonly _handler: Handler;

  constructor() {
    this._handler = new Handler();
  }

  private get handler(): Handler {
    return this._handler;
  }

  async handleMessage(payload: types.IRabbitMessage): Promise<void> {
    this.logNewMessage(payload);

    switch (payload.target) {
      case enums.EMessageTargets.NpcStory:
        return this.handler.npcStoryMessage(payload);
      default:
        throw new errors.IncorrectTargetError();
    }
  }

  private logNewMessage(message: types.IRabbitMessage): void {
    const toLog = { ...structuredClone(message) };

    if ((toLog.payload as Record<string, string>)?.password) {
      (toLog.payload as Record<string, string>).password = '***';
    }

    Log.log('Rabbit', 'Got new message');
    Log.log('Rabbit', toLog);
  }
}
