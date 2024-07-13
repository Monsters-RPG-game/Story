import Validation from '../../../tools/validation';
import type { IGetNpcStoryDto } from './types';

export default class GetNpcStoryDto implements IGetNpcStoryDto {
  id: string;

  constructor(data: IGetNpcStoryDto) {
    this.id = data.id;

    this.validate();
  }

  validate(): void {
    new Validation(this.id, 'id').isDefined().isString().isObjectId();
  }
}
