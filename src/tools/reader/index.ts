import * as errors from '../../errors';
import FileVersionHandler from '../../modules/mainFile/handler';
import StageDto from '../../modules/narratorStory/addMany/stageDto';
import NarratorStoryHandler from '../../modules/narratorStory/handler';
import NpcStoryHandler from '../../modules/npcStory/handler';
import Log from '../logger';
import type { IFileEntity } from '../../modules/mainFile/entity';
import type { INpcEntry } from '../../modules/mainFile/types';
import type { INarratorEntity } from '../../modules/narratorStory/entity';
import type { INpcStoryEntity } from '../../modules/npcStory/entity';
import type * as types from '../../types';
import fs from 'fs';

export default class Reader {
  private _path: string;
  private _fileEntity: IFileEntity | undefined = undefined;
  private _npcEntities: Omit<INpcStoryEntity, '_id'>[] = [];
  private _narratorEntities: Omit<INarratorEntity, '_id'>[] = [];
  private _fileHandler: FileVersionHandler;
  private _npcStoryHandler: NpcStoryHandler;
  private _narratorStoryHandler: NarratorStoryHandler;

  constructor(path: string) {
    this._path = path;
    this._fileHandler = new FileVersionHandler();
    this._npcStoryHandler = new NpcStoryHandler();
    this._narratorStoryHandler = new NarratorStoryHandler();
  }

  get fileEntity(): IFileEntity {
    return this._fileEntity as IFileEntity;
  }

  set fileEntity(value: IFileEntity) {
    this._fileEntity = value;
  }

  get npcEntities(): Omit<INpcStoryEntity, '_id'>[] {
    return this._npcEntities;
  }

  set npcEntities(value: Omit<INpcStoryEntity, '_id'>[]) {
    this._npcEntities = value;
  }

  get narratorEntities(): Omit<INarratorEntity, '_id'>[] {
    return this._narratorEntities;
  }

  set narratorEntities(value: Omit<INarratorEntity, '_id'>[]) {
    this._narratorEntities = value;
  }

  get path(): string {
    return this._path;
  }

  get fileHandler(): FileVersionHandler {
    return this._fileHandler;
  }

  get npcStoryHandler(): NpcStoryHandler {
    return this._npcStoryHandler;
  }

  get narratorStoryHandler(): NarratorStoryHandler {
    return this._narratorStoryHandler;
  }

  getNarratorFromFile(): void {
    this.fileEntity.narrator.episodes.forEach((episode) => {
      const episodeNr = Object.keys(episode)[0];
      if (!episodeNr) throw new errors.EpisodeNumberNotExist();

      const episodeFile = Object.values(episode)[0];
      if (!episodeFile) throw new errors.EpisodeFileNotExist();
      /**
       * We create path to each narrator file based on main path.
       */
      const newFilePathName = this.path.split('/').slice(0, -1).join('/').concat('/', episodeFile);

      const entry = this.readNarratorEntity(newFilePathName, 2);
      if (entry.episode !== parseInt(episodeNr)) {
        throw new errors.EpisodeNumberIncorrect();
      }

      const newStages = entry.stages.map((el) => {
        return new StageDto(el);
      });

      const newNarrator: Omit<INarratorEntity, '_id'> = {
        episode: parseInt(episodeNr),
        stages: newStages,
      };
      this.narratorEntities.push(newNarrator);
    });
  }
  getNpcFromFile(npcEntry: INpcEntry): void {
    const npcId = Object.keys(npcEntry)[0];
    const npcFileName = Object.values(npcEntry);

    /**
     * We create path to each npc file based on main path.
     */
    const newFilePathName = this.path.split('/').slice(0, -1).join('/').concat('/', npcFileName[0]!);
    const entry = this.readNpcEntity(newFilePathName);
    if (npcId !== entry.npcId) {
      throw new errors.FileIdDoesntMatchEntity();
    }

    this.npcEntities.push(entry);
  }
  async init(): Promise<void> {
    const file = this.readFileEntity(this.path);
    if (!file) {
      throw new errors.FileDoesNotExist();
    }
    this.fileEntity = file;
    this.getNarratorFromFile();
    /**
     * We check if there is any main file stored,
     * if not then we populate db.
     */
    const storedVersion = await this.fileHandler.get();
    if (!storedVersion) {
      this.checkNarratorConsitency();
      await this.saveNarratorEntity();
      await this.saveFileVersion();
      await this.saveNpcEntity();
    }

    /**
     * If file is present in db and version stored is different
     * than one provided, we update version,
     * delete all records and create npc all over again.
     */
    if (storedVersion && storedVersion.version !== this.fileEntity.version) {
      const value = this.compareVersion(storedVersion.version, this.fileEntity.version);
      if (value > 0) {
        throw new errors.VersionIncorrect();
      }
      this.checkNarratorConsitency();

      await this.npcStoryHandler.deleteAll();
      await this.narratorStoryHandler.deleteAll();
      await this.saveNpcEntity();
      await this.saveNarratorEntity();
      await this.fileHandler.update({ id: storedVersion._id, version: this.fileEntity.version });
    }
  }

  async saveNarratorEntity(): Promise<void> {
    try {
      await this.narratorStoryHandler.addMany({ narratorEntities: this.narratorEntities });
    } catch (err) {
      const error = err as types.IFullError;
      Log.error('Reader', error.message, error.stack);
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
    const { version } = this.fileEntity;
    if (!version) {
      throw new errors.MissingArgError('version');
    }
    await this.fileHandler.add(version);
    return version;
  }

  checkNarratorConsitency(): void {
    /**
     * StageCount - checks for reapeting stage numbers
     * episodeCount - checks for reapeting episode numbers.
     */
    const episodeCount: number[] = [];
    this.narratorEntities.map((el) => {
      const stageCount: number[] = [];
      if (episodeCount.includes(el.episode)) {
        throw new errors.NarratorEpisodePresent();
      } else {
        episodeCount.push(el.episode);
      }
      el.stages.map((stage) => {
        if (stageCount.includes(stage.stageNumber)) {
          throw new errors.StageNumberPresent();
        } else {
          const chapterCount: number[] = [];
          stage.chapters.map((chap) => {
            if (chapterCount.includes(chap.chapter)) {
              throw new errors.ChapterNumberPresent();
            } else {
              chapterCount.push(chap.chapter);
              return chap;
            }
          });
          stageCount.push(stage.stageNumber);
          return stage;
        }
      });
      return el;
    });
  }

  readFileEntity(path: string): IFileEntity | undefined {
    return JSON.parse(fs.readFileSync(path, 'utf8')) as IFileEntity;
  }

  readNpcEntity(path: string): Omit<INpcStoryEntity, '_id'> {
    return JSON.parse(fs.readFileSync(path, 'utf8')) as Omit<INpcStoryEntity, '_id'>;
  }

  /**
   * Compares two version strings in format 'x.y.z'.
   * @param version1 - The first version string.
   * @param version2 - The second version string.
   * @returns -1 if version1<version2 , 0 if version1=version2, 1 if version1>version2.
   */
  compareVersion(version1: string, version2: string): number {
    const v1Parts = version1.split('.').map(Number);
    const v2Parts = version2.split('.').map(Number);
    for (let i = 0; i < 3; i++) {
      const v1Part = v1Parts[i] ?? 0;
      const v2Part = v2Parts[i] ?? 0;

      if (v1Part < v2Part) {
        return -1;
      } else if (v1Part > v2Part) {
        return 1;
      }
    }

    return 0;
  }

  readNarratorEntity(path: string, _epNumber: number): Omit<INarratorEntity, '_id'> {
    return JSON.parse(fs.readFileSync(path, 'utf8')) as Omit<INarratorEntity, '_id'>;
  }
}
