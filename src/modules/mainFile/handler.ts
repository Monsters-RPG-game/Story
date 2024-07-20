import AddController from './addVersion';
import GetController from './get';
import UpdateController from './update';
import HandlerFactory from '../../tools/abstract/handler';
import type { IFileEntityVersion } from './entity';
import type { IUpdateFileVersionDto } from './update/types';
import type { EModules } from '../../tools/abstract/enums';

export default class MainFileHandler extends HandlerFactory<EModules.IndexFile> {
  private readonly _addController: AddController;
  private readonly _updateController: UpdateController;

  constructor() {
    super(new GetController());
    this._addController = new AddController();
    this._updateController = new UpdateController();
  }

  private get addController(): AddController {
    return this._addController;
  }

  public get updateController(): UpdateController {
    return this._updateController;
  }

  async get(): Promise<IFileEntityVersion | null> {
    return this.getController.get();
  }

  async add(v: string): Promise<void> {
    return this.addController.add(v);
  }
  async update(payload: IUpdateFileVersionDto): Promise<void> {
    return this.updateController.update(payload);
  }
}
