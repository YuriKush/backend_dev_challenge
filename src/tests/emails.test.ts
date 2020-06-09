process.env.NODE_ENV = "";
import * as config from 'config';
import db from '../database';
import Patients from "../components/patients";
import Emails from "../components/emails";
import * as moment from "moment";

const patients = new Patients();
const emails = new Emails(config.emails);
const emailConfig = config.emails;

describe('Emails tests:', () => {
    beforeAll(async () => {
        await db.init(config.mongoDb.connectionString);
    })

    test('Verify Emails were created in Emails Collection for patients who have CONSENT as Y and verify that they are correct', async () => {
        let consentedPatients = await patients.getConsentedPatients();
        for (const patient of consentedPatients){
            let createdEmails = await emails.getEmailsByPatientId(patient._id);

            expect(createdEmails.length).toBe(emailConfig.length);

            let correctEmails = emailConfig.filter(emailTemplate => {
                const index = createdEmails.findIndex(email => {
                    const scheduled_date = moment(email.scheduled_date).format("YYYY-MM-DD");
                    return email.name === emailTemplate.name &&
                        moment(scheduled_date).diff(moment().format("YYYY-MM-DD"), 'days') === emailTemplate.daysDelay;
                });
                return ~index;
            });

            expect(correctEmails.length).toBe(emailConfig.length);
        }
    })
})

