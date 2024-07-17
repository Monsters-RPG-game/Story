import type { IChapter } from '../entity';

export interface IAddNarratorStoryDto {
  stage: number;
  chapter: IChapter;
}
