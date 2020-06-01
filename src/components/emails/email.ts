import * as mongoose from 'mongoose';

const ObjectId = mongoose.Schema.ObjectId;

const schema = new mongoose.Schema({
    id: {
        type: ObjectId,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    scheduled_date: {
        type: Date,
        required: true
    }
});

module.exports = mongoose.model('Email', schema);
