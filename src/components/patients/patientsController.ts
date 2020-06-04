import * as _ from 'lodash';

interface patientDependencies {
    repository
}

export class patientsController {
    constructor(private dependencies: patientDependencies) {}
    async importPatients(stream):Promise<number> {
        let counter:number = 0;
        for await (let row of stream){
            if (Array.isArray(row)) {
                const keys = _.keys(this.dependencies.repository.schema.obj);
                row = _.zipObject(keys, row);
            }
            await this.dependencies.repository.putPatient(row);
            counter++;
        }
        return counter;
    }
    getConsentedPatients() {
        return this.dependencies.repository.getPatients({consent: "Y"});
    }
}
