import type { NextRequest } from 'next/server';
import { getClient, signAuthMessage } from '../../lib/lighthouse';
import {
    WALLET_OPERATOR_PRIVATE_KEY,
    WALLET_OPERATOR_PUBLIC_KEY,
} from '../../lib/env';
import { compileBufferAppendListAsMap } from '../../lib/append-list';
import { createSendWithContentUri } from '../../lib/send-content';

// Native module not found: bls-eth-wasm
export const config = {
    // runtime: 'edge',
};

export default async function TriggerEdgeAPIRoute(request) {
    const url = request.url;
    // cid and contentUri is public and operator trigger with it
    const query = request.query;
    const { cid, contentUri } = query || {};

    console.log('query', query, cid, contentUri);
    // no need to check contract state directly
    // but the access control of file

    // 1. try to get the contact list

    let listContents = [];

    const lighthouse = getClient();

    const operatorSignedMessage = await signAuthMessage(
        WALLET_OPERATOR_PUBLIC_KEY,
        WALLET_OPERATOR_PRIVATE_KEY
    );

    console.log('test cid', cid);

    //TODO list all files
    try {
        const decryptKeyResults = await lighthouse.fetchEncryptionKey(
            cid,
            WALLET_OPERATOR_PUBLIC_KEY,
            operatorSignedMessage
        );
        console.log('fetch decryption key');

        const fileEncryptionKey = decryptKeyResults?.data?.key;

        const fileContentRaw = await lighthouse.decryptFile(
            cid,
            fileEncryptionKey
        );

        listContents.push(Buffer.from(fileContentRaw).toString());
    } catch (err) {
        console.log('Error during fetching contact list');
        console.error(err);
    }

    // const byUserId = compileBufferAppendListAsMap({}, ...listContents);
    // // in real life bring this to some tasks queue to avoid long requests
    // // 2. fire
    // const send = await createSendWithContentUri(contentUri);

    // const results = Promise.all(
    //     Object.keys(byUserId).map(async (userId) => {
    //         const { email } = byUserId[userId];
    //         console.log('send user email', userId, email);

    //         return send(email);
    //     })
    // );

    // return new Response(
    //     JSON.stringify({
    //         results,
    //     }),
    //     { headers: { 'Content-Type': 'application/json' } }
    // );
}
