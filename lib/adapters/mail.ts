import sgMail from '@sendgrid/mail';
import { SENDGRID_API_KEY, MAIL_FROM } from '../env';

class SendGridError extends Error {
    constructor(message) {
        super(message);
        this.name = 'SendGridError';
    }
}
export const handleSendGridError = (err) => {
    // Bad Request otherwise
    if (err.response) {
        console.log('sendgrid error', err);
        throw new SendGridError(JSON.stringify(err.response?.body?.errors));
    }
    throw err;
};

export const getMailClient = () => {
    sgMail.setApiKey(SENDGRID_API_KEY);

    return sgMail;
};

export const sendMail = ({
    to,
    subject,
    text,
}: {
    to: string;
    subject: string;
    text: string;
}) => {
    const msg = {
        to,
        from: MAIL_FROM,
        subject,
        text,
    };

    return getMailClient()
        .send(msg)
        .then(() => {
            console.log('Email sent');
        })
        .catch(handleSendGridError);
};
