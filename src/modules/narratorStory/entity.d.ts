export interface INarratorEpisode {
  [key: string]: string;
}
export interface INarratorEntry {
  episodes: INarratorEpisode[];
}

export interface IChapter {
  chapter: number;
  line: string;
}

export interface IStage {
  stageNumber: number;
  chapters: IChapter[];
}
export interface INarratorEntity {
  _id: string;
  episode: number;
  stages: IStage[];
}
