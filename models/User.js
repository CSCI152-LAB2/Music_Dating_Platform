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
    firstname: {
        type: String,
        required: true
    },
    lastname: {
        type: String,
        required: true
    },
    dob: {
        type: Date,
        required: true
    },
    location: {
        type: String,
        required: true
    },
    sex: {
        type: String,
        required: true
    },
    topGenre: {
        type: String,
        required: true
    },
    topArtist: {
        type: String,
        required: true
    },
    userID: {
        type: Number
    },
    likedUsers: {
        type: Number
    },
    matchedUsers: {
        type: Number
    }
})

module.exports = mongoose.model('User', userSchema);