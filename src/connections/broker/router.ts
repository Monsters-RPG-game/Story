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
     console.log('payload',payload)
    switch (payload.target) {
      case enums.EMessageTargets.NpcStory:
        return this.handler.npcStoryMessage(payload);
      case enums.EMessageTargets.NarratorStory:
        return this.handler.narratorStoryMessage(payload);
      case enums.EMessageTargets.UserCompletion:
        return this.handler.userCompletionMessage(payload);
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
