import type { NextRequest } from 'next/server';
import { getKvClient } from '../../lib/adapters/kv';

export const config = {
    runtime: 'edge',
};

export default async function AddEdgeAPIRoute(request: NextRequest) {
    const url = request.nextUrl;

    const paramId = url.searchParams.get('id') ?? '';
    const paramName = url.searchParams.get('name') ?? '';
    const paramEmail = url.searchParams.get('email') ?? '';

    if (!paramId || !paramName || !paramEmail) {
        return new Response(
            JSON.stringify({
                error: true,
                message: 'missing params',
            })
        );
    }
    const kv = getKvClient();

    await kv.set(paramId, {
        id: paramId,
        name: paramName,
        email: paramEmail,
    });
    // cache as queue first, later calculate from existing state for operations

    return new Response(
        JSON.stringify({
            error: false,
            message: 'success',
            size: kv.size,
        }),
        {
            headers: { 'Content-Type': 'application/json' },
        }
    );
}
