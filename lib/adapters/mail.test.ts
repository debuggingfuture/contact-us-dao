import { describe, test, expect } from '@jest/globals';
import { sendMail } from './mail';

describe('sendgrid ', () => {
    test('#sendMail', async () => {
        const results = await sendMail({
            to: 'hi@debuggingfuture.com',
            subject: 'Send by ContactUsDAO',
            text: 'hello world',
        });
        expect(results).toEqual(undefined);
    });
});
