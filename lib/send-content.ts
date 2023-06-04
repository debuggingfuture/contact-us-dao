import fetch from 'cross-fetch';
import { sendMail } from './adapters/mail';

export const createSendWithContentUri = async (contentUri: string) => {
    console.log('send with content', contentUri);

    const res = await fetch(contentUri);

    const content = await res.json();

    const { subject, message } = content;

    return (to: string) =>
        sendMail({
            to,
            subject,
            text: message,
        });
};
