import { describe, it, expect, afterEach } from '@jest/globals';
import * as errors from '../../../src/errors';
// import FileVersionGetController from '../../../src/modules/mainFile/get';
import Reader from '../../../src/tools/reader';
// import fakeData from '../../sampleData/index.json';
// import LineDto from '../../../src/tools/reader/npc/line.dto';
// import npc1json from '../../sampleData/npc1.json';
import indexjson from '../../sampleData/index.json';
import narrator1 from '../../sampleData/narrator_1.json';
import narrator2 from '../../sampleData/narrator_2.json';
import npc1 from '../../sampleData/npc1.json';
import npc2 from '../../sampleData/npc2.json';
// import type { INpcStoryEntity } from 'modules/npcStory/entity';
import * as utils from '../../utils';
// import fakeData from '../../utils/fakeData.json';
// import type { IFileEntity } from 'modules/mainFile/entity';
// import type { INpcEntry } from '../../../src/modules/mainFile/types';
import type { IFullError } from 'types';
import fs from 'fs';
import os from 'os';
import path from 'path';
import { IFileEntity } from '../../../src/modules/mainFile/entity';

// const fakeFile = fakeData as unknown as IFileEntity;
describe('getFromFile', () => {
  const db = new utils.FakeFactory();
  // const fakeNpc1 = npc1json as unknown as INpcStoryEntity;
  // const fileVersionController = new FileVersionGetController();

  afterEach(async () => {
    await db.cleanUp();
  });
  /**
   * Description
   */
  function createTempFile(content: string, title: string): string {
    const tempDir = os.tmpdir();
    const tempFilePath = path.join(tempDir, title);
    fs.writeFileSync(tempFilePath, JSON.stringify(content, null, 2));
    return tempFilePath;
  }

  describe('should fail', () => {
    describe('missing data', () => {
      it('no version provided', async () => {
        createTempFile(narrator1 as unknown as string, 'narrator_1.json');
        createTempFile(narrator2 as unknown as string, 'narrator_2.json');
        const pathname = createTempFile(indexjson as unknown as string, 'index.json');
        const { version, ...modifiedContent } = indexjson;
        fs.writeFileSync(pathname, JSON.stringify(modifiedContent, null, 2));
        let error: Error = { name: '', message: '' };
        try {
          const reader = new Reader(pathname);
          await reader.init();
        } catch (err) {
          error = err as IFullError;
        }
        expect(error).toEqual(new errors.MissingArgError('version'));
      });
    });
    describe('incorrect data', () => {
      it('Different npc id in main file and npc file', async () => {
        createTempFile(narrator1 as unknown as string, 'narrator_1.json');
        createTempFile(narrator2 as unknown as string, 'narrator_2.json');
        createTempFile(npc1 as unknown as string, 'npc1.json');
        createTempFile(npc2 as unknown as string, 'npc2.json');
        const modifiedContent = { ...indexjson } as unknown as IFileEntity;
        const [firstNpc, ...restNpcs] = modifiedContent.npc;
        console.log(firstNpc);
        const newFirstNpc = { asdasdasd: 'npc1.json' };
        modifiedContent.npc = [newFirstNpc, ...restNpcs];

        const pathname = createTempFile(indexjson as unknown as string, 'index.json');
        fs.writeFileSync(pathname, JSON.stringify(modifiedContent, null, 2));
        let error: Error = { name: '', message: '' };
        try {
          const reader = new Reader(pathname);
          await reader.init();
        } catch (err) {
          error = err as IFullError;
        }
        expect(error).toEqual(new errors.FileIdDoesntMatchEntity());
      });
      it('lower version passed than one stored', async () => {
        await db.fileVersion.version('0.0.2').create();
        const { version, ...rest } = indexjson;
        const modifiedContent = { version: '0.0.1', ...rest };
        const pathname = createTempFile(indexjson as unknown as string, 'index.json');
        fs.writeFileSync(pathname, JSON.stringify(modifiedContent, null, 2));
        let error: Error = { name: '', message: '' };
        try {
          const reader = new Reader(pathname);
          await reader.init();
        } catch (err) {
          error = err as IFullError;
        }
        expect(error).toEqual(new errors.VersionIncorrect());
      });
    });
  });
  // describe('should pass', () => {
  //   const pathname = path.join(__dirname, '../../sampleData/index.json');
  //   it('updates version', async () => {
  //     await db.fileVersion.version('0.0.1').create();
  //     const currentStoredVer = (await fileVersionController.get())!.version;
  //     const reader = new Reader(pathname);
  //     await reader.init();
  //     console.log('CUURE', currentStoredVer);
  //   });
  //   it('get npc file from index', async () => {
  //     const reader = new Reader(pathname);
  //     await reader.init();
  //     fakeNpc1.lines.forEach((line) => {
  //       new LineDto(line);
  //     });
  //     expect(reader.npcEntities[0]?.name).toEqual(fakeNpc1.name);
  //     expect(reader.npcEntities[0]?.npcId).toEqual(fakeNpc1.npcId);
  //   });
  // });
});
