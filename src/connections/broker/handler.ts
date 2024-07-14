import * as enums from '../../enums';
import * as errors from '../../errors';
import NpcStoryController from '../../modules/npcStory/handler';
import type * as types from '../../types/connection';

export default class Handler {
  private readonly _npcStory: NpcStoryController;

  constructor() {
    this._npcStory = new NpcStoryController();
  }

  private get npcStory(): NpcStoryController {
    return this._npcStory;
  }

  async npcStoryMessage(payload: types.IRabbitMessage): Promise<void> {
    switch (payload.subTarget) {
      case enums.ENpcStoryTargets.GetNpcIntent:
        return this.npcStory.getIntent(payload.payload, payload.user);
      case enums.ENpcStoryTargets.GetNpcStory:
        return this.npcStory.get(payload.payload, payload.user);
      default:
        throw new errors.IncorrectTargetError();
    }
  }
}
