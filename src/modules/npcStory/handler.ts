import AddController from './add';
import AddManyController from './addMany';
import DeleteAllController from './deleteAll/';
import GetController from './get';
import GetIntentController from './getIntent';
import * as enums from '../../enums';
import HandlerFactory from '../../tools/abstract/handler';
import State from '../../tools/state';
import type { IAddNpcStoryDto } from './add/types';
import type { IAddManyDto } from './addMany/types';
import type { IGetNpcStoryDto } from './get/types';
import type { IGetNpcIntentDto } from './getIntent/types';
import type { EModules } from '../../tools/abstract/enums';
import type { ILocalUser } from '../../types';

export default class NpcStoryHandler extends HandlerFactory<EModules.NpcStory> {
  private readonly _addController: AddController;
  private readonly _addManyController: AddManyController;
  private readonly _getNpcIntentController: GetIntentController;
  private readonly _deleteAllController: DeleteAllController;

  constructor() {
    super(new GetController());
    this._addController = new AddController();
    this._addManyController = new AddManyController();
    this._deleteAllController = new DeleteAllController();
    this._getNpcIntentController = new GetIntentController();
  }

  private get addController(): AddController {
    return this._addController;
  }

  private get addManyController(): AddManyController {
    return this._addManyController;
  }

  public get deleteAllController(): DeleteAllController {
    return this._deleteAllController;
  }

  async getIntent(payload: unknown, user: ILocalUser): Promise<void> {
    const callback = await this.getNpcIntentController.get(payload as IGetNpcIntentDto);
    return State.broker.send(user.tempId, callback, enums.EMessageTypes.Send);
  }
  public get getNpcIntentController(): GetIntentController {
    return this._getNpcIntentController;
  }
  async add(payload: unknown, user: ILocalUser): Promise<void> {
    const callback = await this.addController.add(payload as IAddNpcStoryDto);
    return State.broker.send(user.tempId, callback, enums.EMessageTypes.Send);
  }

  async addMany(payload: unknown): Promise<void> {
    return this.addManyController.addMany(payload as IAddManyDto);
  }

  async get(payload: unknown, user: ILocalUser): Promise<void> {
    const callback = await this.getController.get(payload as IGetNpcStoryDto);
    return State.broker.send(user.tempId, callback, enums.EMessageTypes.Send);
  }

  async deleteAll(): Promise<void> {
    return this.deleteAllController.deleteAll();
  }
}
