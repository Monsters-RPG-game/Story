export interface ILine {
  intent: string;
  line: string;
}

export interface INpcStoryEntity {
  _id: string;
  name: string;
  npcId: string;
  lines: ILine[];
}

export interface IChapter {
  [key: number]: string;
}

export interface IStage {
  [key: number]: IChapter;
}
export interface INarratorEntity {
  stage: IStage[];
}
