import {patientsController} from "./patientsController";
import * as repository from "./patientsDAL";

export default class Patients extends patientsController{
    constructor() {
        super({repository});
    }
}
