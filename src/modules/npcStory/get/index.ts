import GetNpcStoryDto from './dto';
import ControllerFactory from '../../../tools/abstract/controller';
import Rooster from '../rooster';
import type { IGetNpcStoryDto } from './types';
import type { EModules } from '../../../tools/abstract/enums';
import type { INpcStoryEntity } from '../entity';

export default class Controller extends ControllerFactory<EModules.NpcStory> {
  constructor() {
    super(new Rooster());
  }
  async get(data: IGetNpcStoryDto): Promise<INpcStoryEntity | null> {
    const payload = new GetNpcStoryDto(data);

    return this.rooster.get(payload.id);
  }
}
