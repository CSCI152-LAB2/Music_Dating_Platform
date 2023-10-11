const mongoose = require('mongoose');

const { Schema } = mongoose();

const User = new Schema({
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
    likedUsers: {
        type: User
    },
    matchedUsers: {
        type: User
    }
})

module.exports = User;