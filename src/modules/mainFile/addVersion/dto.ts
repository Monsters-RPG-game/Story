import Validation from '../../../tools/validation';
import type { IAddFileVersionDto } from './types';

export default class AddFileVersionDto implements IAddFileVersionDto {
  version: string;

  constructor(data: IAddFileVersionDto) {
    this.version = data.version;
    this.validate();
  }

  validate(): void {
    new Validation(this.version, 'version').isDefined().isRegexCompatible(/^\d+\.\d+\.\d+$/u, 'wrong format of a version string');
  }
}
