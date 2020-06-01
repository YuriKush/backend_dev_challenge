import * as mongoose from 'mongoose';
import * as config from 'config';

export default {
    init
}

async function init() {
    try {
        const connectionString = config.mongoDb.connectionString;
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
