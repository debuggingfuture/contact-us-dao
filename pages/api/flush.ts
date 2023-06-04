import type { NextRequest } from 'next/server';
import { getKvClient } from '../../lib/adapters/kv';
import {
    applyAccessConditionWithCid,
    uploadEncryptedFileWithText,
} from '../../lib/lighthouse';

export const config = {
    // runtime: 'edge',
};

export default async function FlushEdgeAPIRoute(request: NextRequest, res) {
    const kv = getKvClient();

    const ops = [];
    for await (const [key, value] of kv.iterator()) {
        console.log('kv', key, value);
        // TODO use produce
        ops.push({
            op: 'add',
            path: [key],
            value,
        });
    }

    const results = await uploadEncryptedFileWithText(JSON.stringify(ops));
    // const applyResults = await applyAccessConditionWithCid(cid);

    console.log('flush results', ops, results);
    res.json({
        results,
    });
}
