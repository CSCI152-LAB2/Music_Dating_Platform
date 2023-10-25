const mongoose = require('mongoose');
const User = require('../models/User');

const newUser = await User.create({
    /*username: ,
    password: ,
    firstname: ,
    lastname: ,
    dob: ,
    location: ,
    sex: ,
    topGenre: ,
    topArtist: ,
    userID: ,
    likedUsers: ,
    matchedUsers:*/
})

//commented out until ready to test database insertion and requesting