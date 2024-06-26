const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const userSchema = new Schema({
    username: {
        type: String,
        required: true
    },
    password: {
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
    age: {
        type: Number
    },
    location: {
        type: String
    },
    sex: {
        type: String
    },
    sexualPreference: {
        type: String
    },
    topGenre: {
        type: String
    },
    likedUsers: {
        type: [String]
    },
    dislikedUsers: {
        type: [String]
    },
    matchedUsers: {
        type: [String]
    },
    profilePic: {
        type: String
    },
    currentSocketID: {
        type: String
    }
})

module.exports = mongoose.model('User', userSchema);