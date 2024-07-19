import GetDetailedNarratorStoryDto from './dto';
import ControllerFactory from '../../../tools/abstract/controller';
import Rooster from '../rooster';
import type { IGetDetailedNarratorStoryDto } from './types';
import type { EModules } from '../../../tools/abstract/enums';
import type { IChapter } from '../types';

export default class Controller extends ControllerFactory<EModules.NarratorStory> {
  constructor() {
    super(new Rooster());
  }
  async getByStage(data: IGetDetailedNarratorStoryDto): Promise<(IChapter & { _id: string }) | null> {
    const payload = new GetDetailedNarratorStoryDto(data);

    return this.rooster.getByStage(payload);
  }
}
