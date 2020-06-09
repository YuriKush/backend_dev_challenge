import Email from './email';

export interface emailType {
    id: any,
    email: string,
    scheduled_date: string
}

export async function addEmail(data: emailType) {
    try {
        const emailObj = new Email(data);
        await emailObj.save();
    }catch (err) {
        console.error(err);
    }
}

export function getEmails(filter) {
    const query = Email.find(filter)
    return query.exec();
}
