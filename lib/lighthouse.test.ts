import { describe, test, expect } from '@jest/globals';
import { decryptWithCid, uploadEncryptedFileWithPath } from './lighthouse';
import path from 'path';

describe('lighthouse', () => {
    test('upload email csv', async () => {
        const filePath = path.resolve(__dirname, './test.csv'); //Give absolute path
        const results = await uploadEncryptedFileWithPath(filePath);
        expect(results?.name).toEqual('test.csv');
    });

    // refactor more generic
    test('descrypt uploaded email csv', async () => {
        const filePath = path.resolve(__dirname, './test.csv'); //Give absolute path
        const results = await uploadEncryptedFileWithPath(filePath);

        const cid = results?.cid; // Save File
        const decryptedResults = await decryptWithCid(cid);
        console.log('decrypted Results', decryptedResults);

        console.log(Buffer.from(decryptedResults).toString());
        // fs.createWriteStream('fileName.png').write(Buffer.from(decrypted));
        expect(results?.name).toEqual('test.csv');
        expect(
            !!Buffer.from(decryptedResults).toString().match(/email/)
        ).toEqual(true);
    });
});
