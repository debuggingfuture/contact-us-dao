import { describe, test, expect } from '@jest/globals';
import { getKvClient } from './kv';

describe('kv', () => {
    test('smoke test', async () => {
        const kv = getKvClient();
        await kv.set('foo', 'bar');
        const results = await kv.get('foo');
        expect(results).toEqual('bar');
    });
});
