import AddController from './add';
import AddManyController from './addMany';
import DeleteAllController from './deleteAll';
import GetController from './get';
import GetByStageController from './getDetailed';
import * as enums from '../../enums';
import HandlerFactory from '../../tools/abstract/handler';
import State from '../../tools/state';
import type { IAddNarratorStoryDto } from './add/types';
import type { IAddManyDto } from './addMany/types';
import type { IGetNarratorStoryDto } from './get/types';
import type { IGetDetailedNarratorStoryDto } from './getDetailed/types';
import type { EModules } from '../../tools/abstract/enums';
import type { ILocalUser } from '../../types';

export default class NarratorStoryHandler extends HandlerFactory<EModules.NarratorStory> {
  private readonly _addController: AddController;
  private readonly _addManyController: AddManyController;
  private readonly _getByStageController: GetByStageController;
  private readonly _deleteAllController: DeleteAllController;

  constructor() {
    super(new GetController());
    this._addController = new AddController();
    this._addManyController = new AddManyController();
    this._getByStageController = new GetByStageController();
    this._deleteAllController = new DeleteAllController();
  }

  private get addController(): AddController {
    return this._addController;
  }

  public get addManyController(): AddManyController {
    return this._addManyController;
  }

  async getByStage(payload: unknown, user: ILocalUser): Promise<void> {
    const callback = await this.getByStageController.getByStage(payload as IGetDetailedNarratorStoryDto);
    return State.broker.send(user.tempId, callback, enums.EMessageTypes.Send);
  }
  public get getByStageController(): GetByStageController {
    return this._getByStageController;
  }

  public get deleteAllController(): DeleteAllController {
    return this._deleteAllController;
  }

  async add(payload: unknown, user: ILocalUser): Promise<void> {
    const callback = await this.addController.add(payload as IAddNarratorStoryDto);
    return State.broker.send(user.tempId, callback, enums.EMessageTypes.Send);
  }

  async addMany(payload: unknown): Promise<void> {
    return this.addManyController.addMany(payload as IAddManyDto);
  }

  async get(payload: unknown, user: ILocalUser): Promise<void> {
    const callback = await this.getController.get(payload as IGetNarratorStoryDto);
    return State.broker.send(user.tempId, callback, enums.EMessageTypes.Send);
  }

  async deleteAll(): Promise<void> {
    return this.deleteAllController.deleteAll();
  }
}
