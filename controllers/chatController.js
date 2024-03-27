const Chat = require('../models/ChatModel');
const User = require('../models/User');
const jwt = require('jsonwebtoken');

const archiveChat = async (req, res) => {
    //const { otherUser, chatMessage, sentBy } = req.body;
    const { otherUser, chatMessage } = req.body;
    const verified_token = jwt.verify(req.cookies.token, process.env.SECRET_STR);
    if (!verified_token) {
        return res.redirect('/login');
    }

    const { username } = verified_token;
    console.log('username is = ', username);

    const currentUser = await User.findOne(
        { username }
    )

    const otherUserObject = await User.findOne(
        { username: otherUser }
    );

    const messageObj = {
        //from: sentBy,
        message: chatMessage
    }

    console.log('from backend - message = ', chatMessage);       // for testing purposes
    console.log('current user email is = ', currentUser.email);
    console.log('otherUser email is = ', otherUserObject.email);
    let chatName = currentUser.email + otherUserObject.email;
    console.log('chatName = ', chatName);
    let sendMsgToDB = await Chat.findOneAndUpdate(
        { chatname: chatName },
        { $push: { chats: messageObj } }
    )

    if (sendMsgToDB == null) {
        sendMsgToDB = await Chat.create(
            { chatname: chatName },
            { $push: { chats: messageObj } }
        )
    }
    console.log(sendMsgToDB);
    res.status(200).json({ 'Message': 'Succesfully added message to DB' });
}

module.exports = { archiveChat };