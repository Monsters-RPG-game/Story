import ChapterDto from './chapterDto';
import Validation from '../../../tools/validation';
import type { IChapter, IStage } from '../entity';

export default class StageDto implements IStage {
  stageNumber: number;
  chapters: IChapter[];
  constructor(data: IStage) {
    this.stageNumber = data.stageNumber;
    this.chapters = data.chapters.map((chap) => new ChapterDto(chap));
    this.validate();
  }

  validate(): void {
    new Validation(this.chapters, 'chapters').isDefined().isArray();
    new Validation(this.stageNumber, 'stageNumber').isDefined().isNumber();
  }
}
