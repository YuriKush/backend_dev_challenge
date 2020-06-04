import * as config from 'config';
import {parseFile} from "@fast-csv/parse";
import Patients from "./components/patients";
import Emails from "./components/emails";

const patients = new Patients();
const emails = new Emails(config.emails);

export default async function router(){
    const args = process.argv.slice(2);
    let message;

    switch (args[0]) {
        case 'importPatients':
            message = await importPatients();
            break;
        case 'scheduleEmails':
            message = await scheduleEmails();
            break;
        default:
            message = "Sorry, unknown command";
    }
    return message;
}

async function importPatients(){
    try {
        const readStream = parseFile(config.dataFile.filePath, {skipRows: 1, delimiter: '|'});
        const count = await patients.importPatients(readStream);
        return `${count} patients were imported successfully`;
    }catch (err) {
        console.error(err);
    }
}

async function scheduleEmails(){
    const consentedPatients = await patients.getConsentedPatients();
    for (const patient of consentedPatients){
        await emails.addEmails(patient._id);
    }
    return "Emails have been created";
}
