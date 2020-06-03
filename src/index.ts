import db from './database';
import * as config from 'config';
import { parseFile } from '@fast-csv/parse';
import Patients from "./components/patients";

async function start(){
    await db.init(config.mongoDb.connectionString);
    importPatients();
}

async function importPatients(){
    const readStream = parseFile(config.dataFile.filePath, {skipRows: 1, delimiter: '|'})
        .on('error', error => console.error(error))
        .on('end', (rowCount: number) => {
            console.log(`${rowCount} rows have been imported`);
        });

    const patients = new Patients();
    await patients.importPatients(readStream);
}


start();
