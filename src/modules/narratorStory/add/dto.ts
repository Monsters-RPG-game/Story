import Validation from '../../../tools/validation';
import type { IAddNarratorStoryDto } from './types';
import type { IChapter } from '../entity';

export default class AddNarratorStoryDto implements IAddNarratorStoryDto {
  stage: number;
  chapter: IChapter;
  constructor(data: IAddNarratorStoryDto) {
    this.stage = data.stage;
    this.chapter = data.chapter;

    this.validate();
  }

  validate(): void {
    new Validation(this.stage, 'stage').isDefined().isNumber();
    new Validation(this.chapter, 'chapter').isDefined().isObject();
  }
}
