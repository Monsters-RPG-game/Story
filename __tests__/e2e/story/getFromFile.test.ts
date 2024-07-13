import { describe, it, expect } from '@jest/globals';
import * as errors from '../../../src/errors';
import Reader from '../../../src/tools/reader';
import type { IFullError } from 'types';
import path from 'path';

describe('getFromFile', () => {
  describe('should fail', () => {
    describe('missing data', () => {
      it('no version provided', () => {
        const pathname = path.join(__dirname, '../../sampleData/indexNoV.json');
        let error: Error = { name: '', message: '' };
        try {
          const reader= new Reader(pathname);
          reader.init()
        } catch (err) {
          error = err as IFullError;
        }
        expect(error).toEqual(new errors.MissingArgError('v'));
      });
    });
  });
  describe('should pass', () => {
    it('get npc file from index', () => {
      const pathname = path.join(__dirname, '../../sampleData/index.json');
      const reader = new Reader(pathname);
      const val = reader.fileEntity;
      console.log('val', val);
      console.log('npcies', JSON.stringify(reader.npcEntities, null, 3));

      console.log('intent', JSON.stringify(reader.npcEntities, null, 3));
    });
  });
});
