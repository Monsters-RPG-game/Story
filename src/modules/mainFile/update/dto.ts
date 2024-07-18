import Validation from '../../../tools/validation';
import type { IUpdateFileVersionDto } from './types';

export default class UpdateFileVersionDto implements IUpdateFileVersionDto {
  version: string;
  id: string;

  constructor(data: IUpdateFileVersionDto) {
    this.version = data.version;
    this.id = data.id;

    this.validate();
  }

  private validate(): void {
    new Validation(this.version, 'version')
      .isDefined()
      .isRegexCompatible(/^\d+\.\d+\.\d+$/u, 'wrong format of a version string');
    new Validation(this.id, 'id').isDefined().isObjectId();
  }
}
