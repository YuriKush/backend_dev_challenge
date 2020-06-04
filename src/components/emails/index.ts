import {emailsController} from "./emailsController";
import * as repository from "./emailsDAL";

export default class Emails extends emailsController {
    constructor(emailsConfig) {
        super({repository, emailsConfig});
    }
}
