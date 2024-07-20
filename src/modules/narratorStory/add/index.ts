import AddNarratorStoryDto from './dto';
import ControllerFactory from '../../../tools/abstract/controller';
import Rooster from '../rooster';
import type { IAddNarratorStoryDto } from './types';
import type { EModules } from '../../../tools/abstract/enums';

export default class Controller extends ControllerFactory<EModules.NarratorStory> {
  constructor() {
    super(new Rooster());
  }

  async add(data: IAddNarratorStoryDto): Promise<void> {
    const payload = new AddNarratorStoryDto(data);
    await this.rooster.add(payload);
  }
}
