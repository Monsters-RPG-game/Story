import Validation from '../../../tools/validation';
import type { IUpdateFileVersionDto } from './types';

export default class UpdateFileVersionDto implements IUpdateFileVersionDto {
  v: string;
  id: string;

  constructor(data: IUpdateFileVersionDto) {
    this.v = data.v;
    this.id = data.id;

    this.validate();
  }

  private validate(): void {
    new Validation(this.v, 'v').isDefined().isRegexCompatible(/^\d+\.\d+\.\d+$/u, 'wrong format of a version string');
    new Validation(this.id, 'id').isDefined().isObjectId();
  }
}
