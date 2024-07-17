import type { IStage } from './types';

export interface INarratorEntity {
  _id: string;
  episode: number;
  stages: IStage[];
}
