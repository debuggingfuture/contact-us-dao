import { jest, describe, test, expect, beforeAll } from '@jest/globals';
import {
    decryptWithCid,
    getClient,
    uploadEncryptedFileWithPath,
    applyAccessConditionWithCid,
    signAuthMessage,
} from './lighthouse';
import path from 'path';
import { WALLET_OPERATOR_PRIVATE_KEY, WALLET_OPERATOR_PUBLIC_KEY } from './env';
import { JS_EXT_TO_TREAT_AS_ESM } from 'ts-jest';
import { PROPOSAL_CONTENT_URI } from '../app-config';

jest.setTimeout(10 * 1000);
describe('lighthouse', () => {
    test('upload email csv', async () => {
        const filePath = path.resolve(__dirname, './test.csv'); //Give absolute path
        const results = await uploadEncryptedFileWithPath(filePath);
        expect(results?.name).toEqual('test.csv');
    });

    // refactor more generic
    describe('with file encrypted', () => {
        let cid;
        beforeAll(async () => {
            const filePath = path.resolve(__dirname, './test.csv'); //Give absolute path
            const results = await uploadEncryptedFileWithPath(filePath);

            cid = results?.cid; // Save File
        });

        test('default has no conditions', async () => {
            const lighthouse = getClient();
            const conditionsResults = await lighthouse.getAccessConditions(cid);
            console.log('conditions', conditionsResults);
            expect(conditionsResults.data.conditions.length).toEqual(0);
        });

        test('decrypt uploaded email csv', async () => {
            const decryptedResults = await decryptWithCid(cid);
            console.log('decrypted Results', decryptedResults);

            console.log(Buffer.from(decryptedResults).toString());

            expect(
                !!Buffer.from(decryptedResults).toString().match(/email/)
            ).toEqual(true);
        });

        // todo add test case with not working condition
        test('applyAccessCondition', async () => {
            const operatorSignedMessage = await signAuthMessage(
                WALLET_OPERATOR_PUBLIC_KEY,
                WALLET_OPERATOR_PRIVATE_KEY
            );

            const lighthouse = getClient();

            console.log('no access before apply');
            await expect(
                lighthouse.fetchEncryptionKey(
                    cid,
                    WALLET_OPERATOR_PUBLIC_KEY,
                    operatorSignedMessage
                )
            ).rejects.toEqual({ data: {}, message: "you don't have access" });

            // check condition
            const applyResults = await applyAccessConditionWithCid(
                cid,
                PROPOSAL_CONTENT_URI
            );

            // access ok before apply

            console.log('applyResults', applyResults);
            expect(applyResults.data.status).toEqual('Success');

            // owner can decrypt
            const decryptedResults = await decryptWithCid(cid);

            expect(
                !!Buffer.from(decryptedResults).toString().match(/email/)
            ).toEqual(true);
            console.log('decrypt by owner always worked');

            const operatorSignedMessage2 = await signAuthMessage(
                WALLET_OPERATOR_PUBLIC_KEY,
                WALLET_OPERATOR_PRIVATE_KEY
            );

            const access2 = await lighthouse.fetchEncryptionKey(
                cid,
                WALLET_OPERATOR_PUBLIC_KEY,
                operatorSignedMessage2
            );
            expect(typeof access2?.data?.key).toEqual('string');
        });
    });
});
