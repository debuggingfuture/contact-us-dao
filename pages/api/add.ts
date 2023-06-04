import type { NextRequest } from 'next/server';
import { getKvClient } from '../../lib/adapters/kv';

export const config = {
    // runtime: 'edge',
};

export default async function AddEdgeAPIRoute(req, res) {
    const url = req.nextUrl;

    // const paramId = url.searchParams.get('id') ?? '';
    // const paramName = url.searchParams.get('name') ?? '';
    // const paramEmail = url.searchParams.get('email') ?? '';

    const query = req.query;
    const { id, name, email } = query || {};

    console.log('query', query);

    if (!id || !name || !email) {
        res.json(
            JSON.stringify({
                error: true,
                message: 'missing params',
            })
        );
    }
    const kv = getKvClient();

    kv.set(id, JSON.stringify({ name, email }));

    console.log('size', kv);
    // cache as queue first, later calculate from existing state for operations

    const results = {
        error: false,
        message: 'success',
        size: kv.length,
    };
    return res.json(results);
}
