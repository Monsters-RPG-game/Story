import FileVersion from './model';
import RoosterFactory from '../../tools/abstract/rooster';
import type { IFileEntityVersion } from './entity';
import type { IFile } from './types';
import type { EModules } from '../../tools/abstract/enums';

export default class Rooster extends RoosterFactory<IFile, typeof FileVersion, EModules.IndexFile> {
  constructor() {
    super(FileVersion);
  }
  async getFirst(): Promise<IFileEntityVersion | null> {
    return this.model.findOne({}).lean();
  }
}
