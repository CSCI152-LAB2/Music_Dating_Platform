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

    const checkIfChatExists = await Chat.findOne(
        { chatname: chatName }
    );

    if (checkIfChatExists == null) {
        sendMsgToDB = await Chat.create(
            { chatname: chatName },
            { $push: { chats: messageObj } }
        )
    } else {
        let sendMsgToDB = await Chat.findOneAndUpdate(
            { chatname: chatName },
            { $push: { chats: messageObj } }
        )
        console.log(sendMsgToDB);               // this works but for some reason will not show the most recent message sent
    }

    res.status(200).json({ 'Message': 'Succesfully added message to DB' });
}

const getChats = async (req, res) => {
    const otheruser = req.query.otheruser;
    console.log('from backend getChats otherUser = ', otheruser);
    const verified_token = jwt.verify(req.cookies.token, process.env.SECRET_STR);
    if (!verified_token) {
        return res.redirect('/login');
    }

    try {
    const { username } = verified_token;

    const getUserObject = await User.findOne(
        { username }
    )

    const getOtherUserObject = await User.findOne(
        { username: otheruser }
    )

    const chatName = getUserObject.email + getOtherUserObject.email;
    const findChat = await Chat.findOne(
        { chatname: chatName }
    )
    console.log(findChat);
    res.status(200).send(findChat);
    } catch (err) {
        console.log('Error sending chats', err);
    }
}

module.exports = { archiveChat, getChats };