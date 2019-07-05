const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
    googleID: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    firstname: {
        type: String
    },
    lastname: {
        type: String
    },
    image: {
        type: String
    }
})

const User = mongoose.model('User', UserSchema);
module.exports = User;