import AddUserCompletionDto from './dto';
import ControllerFactory from '../../../tools/abstract/controller';
import Rooster from '../rooster';
import type { IAddUserCompletionDto } from './types';
import type { EModules } from '../../../tools/abstract/enums';

export default class Controller extends ControllerFactory<EModules.UserCompletion> {
  constructor() {
    super(new Rooster());
  }

  async add(data: IAddUserCompletionDto): Promise<void> {
    const payload = new AddUserCompletionDto(data);
    await this.rooster.add(payload);
  }
}
