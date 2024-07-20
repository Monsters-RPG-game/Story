import AddManyDto from './dto';
import ControllerFactory from '../../../tools/abstract/controller';
import Rooster from '../rooster';
import type { IAddManyDto } from './types';
import type { EModules } from '../../../tools/abstract/enums';

export default class Controller extends ControllerFactory<EModules.NarratorStory> {
  constructor() {
    super(new Rooster());
  }

  async addMany(data: IAddManyDto): Promise<void> {
    const payload = new AddManyDto(data);
    await this.rooster.addMany(payload.narratorEntities);
  }
}
