import GetUserCompletionDto from './dto';
import ControllerFactory from '../../../tools/abstract/controller';
import Rooster from '../rooster';
import type { IGetUserCompletionDto } from './types';
import type { EModules } from '../../../tools/abstract/enums';
import type { IUserCompletionEntity } from '../entity';

export default class Controller extends ControllerFactory<EModules.UserCompletion> {
  constructor() {
    super(new Rooster());
  }
  async get(data: IGetUserCompletionDto): Promise<IUserCompletionEntity | null> {
    const payload = new GetUserCompletionDto(data);

    return this.rooster.getByUserId(payload.userId);
  }
}
