import db from './database';

async function start(){
    await db.init();
    console.log("App works!");
}

start();
