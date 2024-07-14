import GetNpcIntentDto from './dto';
import ControllerFactory from '../../../tools/abstract/controller';
import Rooster from '../rooster';
import type { IGetNpcIntentDto } from './types';
import type { EModules } from '../../../tools/abstract/enums';
import type { ILine } from '../entity';

export default class Controller extends ControllerFactory<EModules.NpcStory> {
  constructor() {
    super(new Rooster());
  }
  async get(data: IGetNpcIntentDto): Promise<ILine | null> {
    const payload = new GetNpcIntentDto(data);

    return this.rooster.getIntent(payload);
  }
}
