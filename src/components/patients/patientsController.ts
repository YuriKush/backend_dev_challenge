import * as _ from 'lodash';

export class patientsController {
    constructor(private dependencies) {}
    importPatients(stream) {
        stream.on('data', row => {
            if (Array.isArray(row)) {
                const keys = _.keys(this.dependencies.repository.schema.obj);
                row = _.zipObject(keys, row);
            }
            this.dependencies.repository.putPatient(row);
        })
    }
}
