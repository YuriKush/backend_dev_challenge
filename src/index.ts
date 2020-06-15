import db from './database';
import * as config from 'config';
import router from './router';

async function start(){
    await db.init(config.mongoDb.connectionString);
    return router();
}

async function end(message){
    console.log(message);
    await db.close();
    process.exit(0);
}

process.on('unhandledRejection', (reason, promise) => {
    console.error('Unhandled Rejection at:', promise, 'reason:', reason);
    process.exit(1);
});

start().then(end);
