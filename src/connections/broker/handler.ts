import * as enums from '../../enums';
import * as errors from '../../errors';
import NarratorStoryController from '../../modules/narratorStory/handler';
import NpcStoryController from '../../modules/npcStory/handler';
import type * as types from '../../types/connection';

export default class Handler {
  private readonly _npcStory: NpcStoryController;
  private readonly _narratorStory: NarratorStoryController;

  constructor() {
    this._npcStory = new NpcStoryController();
    this._narratorStory = new NarratorStoryController();
  }

  private get npcStory(): NpcStoryController {
    return this._npcStory;
  }

  public get narratorStory(): NarratorStoryController {
    return this._narratorStory;
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
  async narratorStoryMessage(payload: types.IRabbitMessage): Promise<void> {
    switch (payload.subTarget) {
      case enums.ENarratorStoryTargets.GetNarratorStory:
        return this.narratorStory.get(payload.payload, payload.user);
      case enums.ENarratorStoryTargets.GetByStageNarratorStory:
        return this.narratorStory.getByStage(payload.payload, payload.user);
      default:
        throw new errors.IncorrectTargetError();
    }
  }
}
