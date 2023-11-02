require('dotenv').config();
const express = require('express');
const app = express();
const path = require('path');
const fs = require('fs');
const connectDB = require('./config/dbConnect');
const mongoose = require('mongoose');
const User = require('./models/User');
const PORT = process.env.PORT || 5501;
//const http = require('http');
//const { Server } = require('socket.io');            //IO package functions commented out until further notice

//const server = http.createServer(app);
//const io = new Server(server);
connectDB();

app.use(express.json()) //parses the data in POST and PUT requests which allows us to extract information from the request body
app.use(express.urlencoded({ extended: true }))
app.use(express.static('views'));

app.use('/', require('./routes/index'));
app.use('/signup', require('./routes/signup'));
app.use('/login', require('./routes/login'));
app.use('/onboarding', require('./routes/onboarding'));


/*io.on('connection', () => {
    console.log('user connected');
})
*/

mongoose.connection.once('open', () => {
    console.log('connected to mongoDB');
    app.listen(PORT, () => {
        console.log(`server running on port: ${PORT}`);
    })
}).on('error', (err) => {
    console.log('MongoDB connection error: ', err);
})
