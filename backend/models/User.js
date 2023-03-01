const mongoose = require('mongoose');
const emailValidator = require('email-validator');

const userSchema = new mongoose.Schema({
    email: {
        type: String, required: true, unique: true,
        validate: {
        validator: (value) => {
            return emailValidator.validate(value);
        }},
    },
    password: {
        type: String,
        required: true
    }
});

module.exports = mongoose.model('User', userSchema);
