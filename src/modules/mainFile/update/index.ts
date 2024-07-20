import UpdateFileVersionDto from './dto';
import * as errors from '../../../errors';
import ControllerFactory from '../../../tools/abstract/controller';
import Rooster from '../rooster';
import type { IUpdateFileVersionDto } from './types';
import type { EModules } from '../../../tools/abstract/enums';

export default class Controller extends ControllerFactory<EModules.IndexFile> {
  constructor() {
    super(new Rooster());
  }

  async update(data: IUpdateFileVersionDto): Promise<void> {
    const payload = new UpdateFileVersionDto(data);
    const exist = await this.rooster.get(payload.id);
    if (!exist) throw new errors.FileDoesNotExist();
    await this.rooster.update(payload.id, { version: payload.version });
  }
}
