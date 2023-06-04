import { PROPOSAL_CONTENT_URI } from '../app-config';
import { createSendWithContentUri } from './send-content';

import { describe, test, expect } from '@jest/globals';

describe('send content', () => {
    test('#sendWithContentUri', async () => {
        const send = await createSendWithContentUri(PROPOSAL_CONTENT_URI);
        const results = await send('hi@debuggingfuture.com');
        expect(results).toEqual(undefined);
    });
});
