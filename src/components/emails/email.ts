import {Schema, model, Types} from 'mongoose';

const schema = new Schema({
    id: {
        type: Types.ObjectId,
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

export default model('Email', schema);
