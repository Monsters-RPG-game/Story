import Validation from '../../../tools/validation';
import type { IChapter } from '../entity';

export default class ChapterDto implements IChapter {
  chapter: number;
  line: string;

  constructor(data: IChapter) {
    this.chapter = data.chapter;
    this.line = data.line;
    this.validate();
  }
  validate(): void {
    new Validation(this.chapter, 'chapter').isDefined().isNumber();
    new Validation(this.line, 'line').isDefined().isString();
  }
}
