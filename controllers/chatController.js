const ChatModel = require('../models/ChatModel');
const User = require('../models/User');
const jwt = require('jsonwebtoken');

const archiveChat = async (req, res) => {
    const { chatMessage } = req.body;
    const verified_token = jwt.verify(req.cookies.token, process.env.SECRET_STR)
    if (!verified_token) {
        return res.redirect('/login');
    }
    console.log(chatMessage);       // for testing purposes
    const { username } = verified_token;

    /*const findUserChatLogs = await ChatModel.findOneAndUpdate(
        { username }
    )*/
}

module.exports = { archiveChat };