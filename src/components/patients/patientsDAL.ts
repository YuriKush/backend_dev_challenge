import Patient from './patient';

export async function putPatient (data){
    return await Patient.updateOne(
        { email: data.email },
        data,
        { upsert: true }
    );
}

export const schema = Patient.schema;
