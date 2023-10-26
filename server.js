require('dotenv').config();
const express = require('express');
const app = express();
const path = require('path');
const fs = require('fs');
const connectDB = require('./config/dbConnect');
const mongoose = require('mongoose');
const User = require('./models/User');
const PORT = process.env.PORT || 5501;

connectDB();

app.use(express.json()) //parses the data in POST and PUT requests which allows us to extract information from the request body
app.use(express.urlencoded({ extended: true }))

app.use('/', require('./routes/index'));
app.use('/signup', require('./routes/signup'));
app.use('/login', require('./routes/login'));
/*app.use('/home', require('./routes/mainpage'));
app.use('/messages', require('./routes/messages'));
app.use('/onboarding', require('./routes/onboarding'));
app.use('/profile', require('./routes/profilepage'));
app.use('/settings', require('./routes/settings'));
*/


mongoose.connection.once('open', () => {
    console.log('connected to mongoDB');
    app.listen(PORT, () => {
        console.log(`server running on port: ${PORT}`);
    })
})

/*app.listen(PORT, () => {
    console.log(`server running on port: ${PORT}`);
})*/