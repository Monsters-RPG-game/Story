export interface IChapter {
  [key: number]: string;
}

export interface IStage {
  [key: number]: IChapter;
}
export interface INarratorEntity {
  stage: IStage[];
}
export interface INpcEntry {
  [id: string]: string;
}

export interface IFileEntity {
  v: string;
  npc: INpcEntry[];
  narrator: INarratorEntity;
}
export interface IFileEntityVersion {
  _id: string;
  v: string;
}
