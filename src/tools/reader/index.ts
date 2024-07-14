import * as errors from '../../errors';
import FileVersionHandler from '../../modules/mainFile/handler';
import NpcStoryHandler from '../../modules/npcStory/handler';
import Log from '../logger';
import type { IFileEntity, INpcEntry } from '../../modules/mainFile/entity';
import type { INpcStoryEntity } from '../../modules/npcStory/entity';
import type * as types from '../../types';
import fs from 'fs';

export default class Reader {
  private _path: string;
  private _fileEntity: IFileEntity | undefined = undefined;
  private _npcEntities: Omit<INpcStoryEntity, '_id'>[] = [];
  private _fileHandler: FileVersionHandler;
  private _npcStoryHandler: NpcStoryHandler;

  constructor(path: string) {
    this._path = path;
    this._fileHandler = new FileVersionHandler();
    this._npcStoryHandler = new NpcStoryHandler();
  }

  public get path(): string {
    return this._path;
  }

  public get fileHandler(): FileVersionHandler {
    return this._fileHandler;
  }

  public get npcStoryHandler(): NpcStoryHandler {
    return this._npcStoryHandler;
  }

  public get fileEntity(): IFileEntity {
    return this._fileEntity as IFileEntity;
  }

  public set fileEntity(value: IFileEntity) {
    this._fileEntity = value;
  }

  public get npcEntities(): Omit<INpcStoryEntity, '_id'>[] {
    return this._npcEntities;
  }

  public set npcEntities(value: Omit<INpcStoryEntity, '_id'>[]) {
    this._npcEntities = value;
  }

  async init(): Promise<void> {
    const file = this.readFileEntity(this.path);
    if (!file) {
      throw new errors.FileDoesNotExist();
    }
    this.fileEntity = file;
    /**
     * We check if there is any main file stored,
     * if not then we populate db
     */
    const res = await this.fileHandler.get();
    if (!res) {
      await this.saveFileVersion();
      await this.saveNpcEntity();
    }

    /**
     * If file is present in db and version stored is different
     * than one provided, we update version,
     * delete all records and create npc all over again
     */
    if (res && res.v !== this.fileEntity.v) {
      await this.npcStoryHandler.deleteAll();
      await this.saveNpcEntity();
      await this.fileHandler.update({ id: res._id, v: this.fileEntity.v });
    }
  }

  async saveNpcEntity(): Promise<void> {
    this.fileEntity.npc.forEach((entry) => {
      this.getNpcFromFile(entry);
    });
    try {
      await this.npcStoryHandler.addMany({ npcEntities: this.npcEntities });
    } catch (err) {
      const error = err as types.IFullError;
      Log.error('Reader', error.message, error.stack);
    }
  }

  async saveFileVersion(): Promise<string | undefined> {
    const version = this.fileEntity.v;
    if (!version) {
      throw new errors.MissingArgError('v');
    }
    await this.fileHandler.add(version);
    return version;
  }

  getNpcFromFile(npcEntry: INpcEntry): void {
    const npcId = Object.keys(npcEntry)[0];
    const npcFileName = Object.values(npcEntry);

    /**
     * We create path to each npc file based on main path
     */
    const newFilePathName = this.path.split('/').slice(0, -1).join('/').concat('/', npcFileName[0]!);
    const entry = this.readNpcEntity(newFilePathName);
    if (npcId !== entry.npcId) {
      throw new errors.FileIdDoesntMatchEntity();
    }
    this.npcEntities.push(entry);
  }

  readFileEntity(path: string): IFileEntity | undefined {
    return JSON.parse(fs.readFileSync(path, 'utf8')) as IFileEntity;
  }

  readNpcEntity(path: string): Omit<INpcStoryEntity, '_id'> {
    return JSON.parse(fs.readFileSync(path, 'utf8')) as Omit<INpcStoryEntity, '_id'>;
  }
}
