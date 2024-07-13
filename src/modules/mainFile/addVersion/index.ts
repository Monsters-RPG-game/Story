import AddFileVersionDto from './dto';
import ControllerFactory from '../../../tools/abstract/controller';
import Rooster from '../rooster';
import type { EModules } from '../../../tools/abstract/enums';

export default class Controller extends ControllerFactory<EModules.IndexFile> {
  constructor() {
    super(new Rooster());
  }

  async add(v: string): Promise<void> {
    const payload = new AddFileVersionDto({ v });
    await this.rooster.add(payload);
  }
}
