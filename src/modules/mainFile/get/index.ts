import ControllerFactory from '../../../tools/abstract/controller';
import Rooster from '../rooster';
import type { EModules } from '../../../tools/abstract/enums';
import type { IFileEntityVersion } from '../entity';

export default class Controller extends ControllerFactory<EModules.IndexFile> {
  constructor() {
    super(new Rooster());
  }

  async get(): Promise<IFileEntityVersion | null> {
    return this.rooster.getFirst();
  }
}
