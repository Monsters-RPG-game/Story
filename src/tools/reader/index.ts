import * as errors from '../../errors';
import FileVersionAdd from '../../modules/mainFile/addVersion';
// import FileEntityDto from '../../modules/mainFile/dto';
import FileVersionGet from '../../modules/mainFile/get';
import FileVersionHandler from '../../modules/mainFile/handler';
import NpcStoryHandler from '../../modules/npcStory/handler';
import type { IFileEntity, INpcEntry } from '../../modules/mainFile/entity';
import type { INpcStoryEntity } from '../../modules/npcStory/entity';
import fs from 'fs';

export default class Reader {
  private _path: string;
  private _fileEntity: IFileEntity | undefined = undefined;
  private _npcEntities: Omit<INpcStoryEntity, '_id'>[] = [];
  private _fileHandler: FileVersionHandler;
  private _fileVersionAdd: FileVersionAdd;
  private _fileVersionGet: FileVersionGet;
  private _npcStoryHandler: NpcStoryHandler;

  constructor(path: string) {
    this._path = path;
    this._fileHandler = new FileVersionHandler();
    this._fileVersionAdd = new FileVersionAdd();
    this._fileVersionGet = new FileVersionGet();
    this._npcStoryHandler = new NpcStoryHandler();
  }

  public get path(): string {
    return this._path;
  }

  public get fileVersionAdd(): FileVersionAdd {
    return this._fileVersionAdd;
  }

  public get fileVersionGet(): FileVersionGet {
    return this._fileVersionGet;
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
    // create npc dtos for each entry and save them to db
    // and flush db each time
    const res = await this.fileHandler.get();
    if (!res) {
      await this.addFileVersion();
      await this.saveNpcEntity();
    }
    if (res && res.v !== this.fileEntity.v) {
      await this.npcStoryHandler.deleteAll();
      await this.saveNpcEntity();
      await this.fileHandler.update({ id: res._id, v: this.fileEntity.v });
    }
  }

  readFileEntity(path: string): IFileEntity | undefined {
    return JSON.parse(fs.readFileSync(path, 'utf8')) as IFileEntity;
  }

  readNpcEntity(path: string): Omit<INpcStoryEntity, '_id'> {
    return JSON.parse(fs.readFileSync(path, 'utf8')) as Omit<INpcStoryEntity, '_id'>;
  }

  async saveNpcEntity(): Promise<void> {
    this.fileEntity.npc.forEach((entry) => {
      this.getNpcFromFile(entry);
    });
    try {
      console.log('READER');
      await this.npcStoryHandler.addMany({ npcEntities: this.npcEntities });
    } catch (error) {
      console.log('----', error);
    }
  }

  async addFileVersion(): Promise<string | undefined> {
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
    const newFilePathName = this.path.split('/').slice(0, -1).join('/').concat('/', npcFileName[0]!);
    const entry = this.readNpcEntity(newFilePathName);
    if (npcId !== entry.npcId) {
      throw new errors.FileIdDoesntMatchEntity();
    }
    this.npcEntities.push(entry);
  }
}
