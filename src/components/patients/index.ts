import {patientsController} from "./patientsController";
import * as patientsRepository from "./patientsDAL";

export default class Patients extends patientsController{
    constructor() {
        super({repository: patientsRepository});
    }
}
