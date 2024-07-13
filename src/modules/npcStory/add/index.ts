import AddNpcStoryDto from './dto';
import ControllerFactory from '../../../tools/abstract/controller';
import Rooster from '../rooster';
import type { IAddNpcStoryDto } from './types';
import type { EModules } from '../../../tools/abstract/enums';

export default class Controller extends ControllerFactory<EModules.NpcStory> {
  constructor() {
    super(new Rooster());
  }

  async add(data: IAddNpcStoryDto): Promise<void> {
    const payload = new AddNpcStoryDto(data);
    await this.rooster.add(payload);
  }
}
