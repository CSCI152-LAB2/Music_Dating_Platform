require('dotenv').config();
const express = require('express');
const app = express();
const path = require('path');
const fs = require('fs');
const connectDB = require('./config/dbConnect');
const mongoose = require('mongoose');
const User = require('./models/User');
const PORT = process.env.PORT || 5501;
const cors = require('cors');
const session = require('express-session')
const http = require('http');
const socketIO = require('socket.io');
const { verifyCookie } = require('./middlewares/verifyJWT');
const cookieParser = require('cookie-parser')

app.use(cors());

const server = http.createServer(app);
const io = socketIO(server);

connectDB();
app.use(cookieParser())

app.use(express.json()) //parses the data in POST and PUT requests which allows us to extract information from the request body
app.use(express.urlencoded({ extended: true }))

app.use(express.static('views'));

let connectionNumber = 0;
io.on('connection', (socket) => {
    connectionNumber++;
    console.log(`user ${connectionNumber} connected`);
    socket.on('chat message', (msg) => {
        console.log('message: ', msg);              // for testing purposes
        io.emit('chat message', msg);
    })
    socket.on('disconnect', () => {
        console.log(`user has disconnected`);
    })

    /*socket.on('joinRoom', (room) => {
        socket.join(room);
        socket.emit('message', 'Welcome to the chat');
    })

    socket.on('disconnect', () => {
        console.log('user disconnected');
    })*/
})

app.use('/signup', require('./routes/signup'));
app.use('/onboarding', require('./routes/onboarding'));
app.use('/login', require('./routes/login'));

//app.use(verifyCookie);

app.use('/index', require('./routes/mainpage'));
//app.use('/onboarding', require('./routes/onboarding'));
//app.use('/main', require('./routes/mainpage'));
app.use('/message', require('./routes/messages'));
app.use('/profile', require('./routes/profilepage'));
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

mongoose.connection.once('open', () => {
    console.log('connected to mongoDB');
    server.listen(PORT, () => {
        console.log(`server running on port: ${PORT}`);
    })
}).on('error', (err) => {
    console.log('MongoDB connection error: ', err);
})
