import Validation from '../../../tools/validation';
import type { IGetNarratorStoryDto } from './types';

export default class GetNarratorStoryDto implements IGetNarratorStoryDto {
  id: string;

  constructor(data: IGetNarratorStoryDto) {
    this.id = data.id;

    this.validate();
  }

  validate(): void {
    new Validation(this.id, 'id').isDefined().isString().isObjectId();
  }
}
