import * as enums from '../../enums';
import * as errors from '../../errors';
import NarratorStoryController from '../../modules/narratorStory/handler';
import UserCompletionController from '../../modules/userCompletion/handler';
import NpcStoryController from '../../modules/npcStory/handler';
import type * as types from '../../types/connection';

export default class Handler {
  private readonly _npcStory: NpcStoryController;
  private readonly _narratorStory: NarratorStoryController;
  private readonly _userCompletion: UserCompletionController;

  constructor() {
    this._npcStory = new NpcStoryController();
    this._narratorStory = new NarratorStoryController();
    this._userCompletion = new UserCompletionController();
  }

  private get npcStory(): NpcStoryController {
    return this._npcStory;
  }

  public get narratorStory(): NarratorStoryController {
    return this._narratorStory;
  }

  public get userCompletion(): UserCompletionController {
    return this._userCompletion;
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
  async userCompletionMessage(payload: types.IRabbitMessage): Promise<void> {
    switch (payload.subTarget) {
      case enums.EUserCompletionTargets.AddUserCompletion:
        return this.userCompletion.add(payload.payload, payload.user);
      case enums.EUserCompletionTargets.GetUserCompletion:
        return this.userCompletion.get(payload.payload, payload.user);
      default:
        throw new errors.IncorrectTargetError();
    }
  }
}
