import {Schema, model} from 'mongoose';

const schema = new Schema({
    programIdentifier: {
        type: Number
    },
    dataSource: {
        type: String
    },
    cardNumber: {
        type: Number
    },
    memberId: {
        type: Number
    },
    firstName: {
        type: String
    },
    lastName: {
        type: String
    },
    dateOfBirth: {
        type: Date
    },
    address1: {
        type: String
    },
    address2: {
        type: String
    },
    city: {
        type: String
    },
    state: {
        type: String
    },
    zipCode: {
        type: Number
    },
    telephone: {
        type: String
    },
    email: {
        type: String,
        unique: true
    },
    consent: {
        type: String,
        default: 'N'
    },
    mobilePhone: {
        type: String
    }
});

export default model('Patient', schema);
