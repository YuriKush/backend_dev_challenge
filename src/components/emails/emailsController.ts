import * as moment from "moment";

interface emailDependencies {
    repository,
    emailsConfig
}

export class emailsController {
    constructor(private dependencies: emailDependencies) {}
    async addEmails(id) {
        try {
            const promises = this.dependencies.emailsConfig.map(schedule => {
                let emailObj = {
                    id,
                    name: schedule.name,
                    scheduled_date: moment().add(schedule.daysDelay, 'days')
                };
                return this.dependencies.repository.addEmail(emailObj);
            })
            await Promise.all(promises);
        }catch(err){
            console.error(err);
        }
    }
}
