const mongoose = require('mongoose');
const { Schema } = mongoose;

const ContactSchema = new Schema({
    name : {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    subject: {
        type: String,
        required: true,
    },
    message: {
        type: String,
        required: true,
    },
    date: {
        type: Date,
        default: Date.now,
    }
});

const contactInfo = mongoose.model('ContactForm', ContactSchema)
module.exports = contactInfo