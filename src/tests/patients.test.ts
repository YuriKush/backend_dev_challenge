import * as config from 'config';
import {parseFile} from "@fast-csv/parse";
import * as _ from 'lodash';
import db from '../database';
import Patients from "../components/patients";
const assert = require('assert').strict;
import * as moment from "moment";

const patients = new Patients();

describe('Patients tests:', () => {
    beforeAll(async () => {
        await db.init(config.mongoDb.connectionString);
    })

    test('Verify the data in flat file matches the data in Patients collection', async () => {
        const fields = ['programIdentifier', 'dataSource', 'cardNumber', 'memberId', 'firstName', 'lastName', 'dateOfBirth',
            'address1', 'address2', 'city', 'state', 'zipCode', 'telephone', 'email', 'consent', 'mobilePhone'];

        const collectionCount = await patients.getPatientsCount();

        let matchCount = 0;

        const readStream = parseFile(config.dataFile.filePath, {skipRows: 1, delimiter: '|'});

        for await (let row of readStream){
            row = _.zipObject(fields, row);

            let patient = await patients.getPatientByMemberId(parseInt(row.memberId));
            if (!patient) return;

            patient = patient.toObject();
            delete patient.__v;
            delete patient._id;
            if (patient.dateOfBirth) patient.dateOfBirth = moment(patient.dateOfBirth).format('L');
            for (let key in patient){
                patient[key] = patient[key].toString();
            }

            try {
                assert.deepStrictEqual(row, patient);
                matchCount++;
            }catch (e) {}
        }
        expect(matchCount).toBe(collectionCount);
    });

    test('All Patient IDs where the first name is missing (see result below)', async () => {
        const patientsWithoutFirstName = await patients.getPatientsByName("");
        console.log('All Patient IDs where the first name is missing',patientsWithoutFirstName);
    });

    test('All Patient IDs where the email address is missing, but consent is Y (see result below)', async () => {
        let consentedPatients = await patients.getConsentedPatients();
        consentedPatients = consentedPatients.filter(patient => !patient.email);
        console.log('All Patient IDs where the email address is missing, but consent is Y',consentedPatients);
    });
})

