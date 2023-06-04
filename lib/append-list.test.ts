import fs from 'fs';
import path from 'path';
import { describe, test, expect } from '@jest/globals';
import { decryptWithCid, uploadEncryptedFileWithPath } from './lighthouse';
import { compileBufferAppendListAsMap } from './append-list';

describe('append list', () => {
    test('compileBufferAppendListAsMap', async () => {
        const filePath1 = path.resolve(__dirname, './input-1.fixture.json');
        const data1 = fs.readFileSync(filePath1);
        const filePath2 = path.resolve(__dirname, './input-2.fixture.json');
        const data2 = fs.readFileSync(filePath2);

        const results = compileBufferAppendListAsMap({}, data1, data2);
        expect(results).toEqual({
            'user-1': { email: 'z@z.com' },
            'user-2': { email: 'b@b.com' },
            'user-3': { email: 'c@c.com' },
        });
    });
});
