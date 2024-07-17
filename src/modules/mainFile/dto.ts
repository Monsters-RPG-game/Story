// import Validation from '../../tools/validation';
// import type { IFileEntity, INarratorEntry, INpcEntry } from './entity';
//
// export default class FileEntityDto implements IFileEntity {
//   v: string;
//   npc: INpcEntry[];
//   narrator: INarratorEntry;
//
//   constructor(data: IFileEntity) {
//     this.v = data.v;
//     this.npc = data.npc;
//     this.narrator = data.narrator;
//
//     this.validate();
//   }
//
//   validate(): void {
//     new Validation(this.v, 'v').isDefined().isString();
//     new Validation(this.npc, 'npc').isDefined().isArray();
//     new Validation(this.narrator, 'narrator').isDefined();
//   }
// }
