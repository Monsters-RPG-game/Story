import ControllerFactory from '../../../tools/abstract/controller';
import Rooster from '../rooster';
import type { EModules } from '../../../tools/abstract/enums';

export default class Controller extends ControllerFactory<EModules.NpcStory> {
  constructor() {
    super(new Rooster());
  }

  async deleteAll(): Promise<void> {
    await this.rooster.deleteAll();
  }
}
