import GetNarratorStoryDto from './dto';
import ControllerFactory from '../../../tools/abstract/controller';
import Rooster from '../rooster';
import type { IGetNarratorStoryDto } from './types';
import type { EModules } from '../../../tools/abstract/enums';
import type { INarratorEntity } from '../entity';

export default class Controller extends ControllerFactory<EModules.NarratorStory> {
  constructor() {
    super(new Rooster());
  }
  async get(data: IGetNarratorStoryDto): Promise<INarratorEntity | null> {
    const payload = new GetNarratorStoryDto(data);

    return this.rooster.get(payload.id);
  }
}
