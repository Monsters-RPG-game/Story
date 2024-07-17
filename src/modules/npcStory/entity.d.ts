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
