import * as mongoose from 'mongoose';

export default {
    init,
    close
}

async function init(connectionString) {
    try {
        const options = {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useCreateIndex: true
        };

        await mongoose.connect(connectionString, options);
        console.log("MongoDb is connected successfully");
    } catch (err) {
        console.error('Could not connect to MongoDB!');
        process.exit(1);
    }
}

async function close() {
    try {
        await mongoose.connection.close();
        console.log("MongoDb is disconnected");
    } catch (err) {
        console.log(err);
    }
}
