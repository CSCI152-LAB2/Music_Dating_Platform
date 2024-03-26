const ChatModel = require('../models/ChatModel');
const User = require('../models/User');
const jwt = require('jsonwebtoken');

const archiveChat = async (req, res) => {
    const {otherUser, chatMessage} = req.body;
    const verified_token = jwt.verify(req.cookies.token, process.env.SECRET_STR)
    if (!verified_token) {
        return res.redirect('/login');
    }
    console.log('from backend - message = ', chatMessage);       // for testing purposes
    const { username } = verified_token;
    let chatName = otherUser + username;
    const sendMsgToDB = await ChatModel.findOneAndUpdate(
        {username}
    )
    res.status(200).json('Succesfully added message to DB');
}

module.exports = { archiveChat };