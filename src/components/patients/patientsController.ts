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
    getPatientsByName(firstName?: string, lastName?: string) {
        const conditions:any = {};
        if (typeof firstName !== 'undefined') conditions.firstName = firstName;
        if (typeof lastName !== 'undefined') conditions.lastName = lastName;
        if (_.isEmpty(conditions)) throw new Error("You have to provide at least one parameter");

        return this.dependencies.repository.getPatients(conditions);
    }
    async getPatientByMemberId(memberId: number) {
        const result = await this.dependencies.repository.getPatients({memberId});
        return result[0];
    }
    getPatientsCount(): Promise<number> {
        return this.dependencies.repository.getPatientsCount();
    }
}
