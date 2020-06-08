import Patient from './patient';

export const schema = Patient.schema;

export async function putPatient (data){
    try{
        await Patient.updateOne(
            { email: data.email },
            data,
            { upsert: true }
        );
    }catch (err) {
        console.error(err);
    }
}

type consentType = 'Y' | 'N';

type filterParameters = {
    consent: consentType
}

export function getPatients(filter: filterParameters) {
    const query = Patient.find(filter)
    return query.exec();
}

export function getPatientsCount() {
    return Patient.countDocuments();
}
