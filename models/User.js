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
    dob: {
        type: Date
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
    topArtist: {
        type: String
    },
    likedUsers: {
        type: [Number]
    },
    matchedUsers: {
        type: [Number]
    }
})

module.exports = mongoose.model('User', userSchema);