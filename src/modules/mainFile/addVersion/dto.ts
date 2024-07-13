import Validation from '../../../tools/validation';
import type { IAddFileVersionDto } from './types';

export default class AddFileVersionDto implements IAddFileVersionDto {
  v: string;

  constructor(data: IAddFileVersionDto) {
    this.v = data.v;
    this.validate();
  }

  validate(): void {
    new Validation(this.v, 'v').isDefined().isRegexCompatible(/^\d+\.\d+\.\d+$/u, 'wrong format of a version string');
  }
}
