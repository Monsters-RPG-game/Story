import { describe, it, expect, afterEach } from '@jest/globals';
import * as errors from '../../../src/errors';
import FileVersionGetController from '../../../src/modules/mainFile/get';
import Reader from '../../../src/tools/reader';
// import fakeData from '../../sampleData/index.json';
import LineDto from '../../../src/tools/reader/npc/line.dto';
import npc1json from '../../sampleData/npc1.json';
import type { INpcStoryEntity } from 'modules/npcStory/entity';
// import type { IFileEntity } from 'modules/mainFile/entity';
import type { IFullError } from 'types';
import path from 'path';

// const fakeFile = fakeData as unknown as IFileEntity;
describe('getFromFile', () => {
  const fakeNpc1 = npc1json as unknown as INpcStoryEntity;
  let fileVersionController = new FileVersionGetController();

  afterEach(() => {
    fileVersionController = new FileVersionGetController();
  });

  describe('should fail', () => {
    describe('missing data', () => {
      it('no version provided', async () => {
        const pathname = path.join(__dirname, '../../sampleData/indexNoV.json');
        let error: Error = { name: '', message: '' };
        try {
          const reader = new Reader(pathname);
          await reader.init();
        } catch (err) {
          error = err as IFullError;
        }
        expect(error).toEqual(new errors.MissingArgError('v'));
      });
    });
  });
  describe('should pass', () => {
    const pathname = path.join(__dirname, '../../sampleData/index.json');
    // it('updates version', async () => {
    //   const currentStoredVer = (await fileVersionController.get())!.v;
    //   const reader = new Reader(pathname);
    //   await reader.init();
    //   console.log('CUURE',currentStoredVer)
    // });
    it('get npc file from index', async () => {
      const reader = new Reader(pathname);
      await reader.init();
      fakeNpc1.lines.forEach((line) => {
        new LineDto(line);
      });
      expect(reader.npcEntities[0]?.name).toEqual(fakeNpc1.name);
      expect(reader.npcEntities[0]?.npcId).toEqual(fakeNpc1.npcId);
    });
  });
});
