import * as mongoose from 'mongoose';

const schema = new mongoose.Schema({
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
        type: Boolean,
        default: false
    },
    mobilePhone: {
        type: String
    }
});

module.exports = mongoose.model('Patient', schema);
