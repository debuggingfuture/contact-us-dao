import fs from 'fs';
import path from 'path';
import { describe, test, expect } from '@jest/globals';
import { decryptWithCid, uploadEncryptedFileWithPath } from './lighthouse';
import { compileEndState } from './state-helper';

describe('state', () => {
    test('state pathces', async () => {
        const filePath1 = path.resolve(__dirname, './input-1.fixture.json');
        const data1 = JSON.parse(fs.readFileSync(filePath1).toString());
        const filePath2 = path.resolve(__dirname, './input-2.fixture.json');
        const data2 = JSON.parse(fs.readFileSync(filePath2).toString());
        const results = compileEndState({}, [...data1, ...data2]);
        expect(results).toEqual({
            'user-1': { name: 'z@z.com' },
            'user-2': { name: 'b@b.com' },
            'user-3': { name: 'c@c.com' },
        });
    });
});
