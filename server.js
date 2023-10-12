require('dotenv').config();
const express = require('express');
const app = express();
const path = require('path');
const fs = require('fs');
const connectDB = require('./config/dbConnect');
const mongoose = require('mongoose');
const PORT = process.env.PORT || 5501;

connectDB();

app.use(express.json()) //parses the data in POST and PUT requests which allows us to extract information from the request body
app.use(express.urlencoded({ extended: true }))

app.use('/', require('./routes/index'));
app.use('/messages', require('./routes/messages'));

mongoose.connection.once('open', () => {
    console.log('connected to mongoDB');
    app.listen(PORT, () => {
        console.log(`server running on port: ${PORT}`)
    })
})