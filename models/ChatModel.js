const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const ChatModel = new Schema({
    chatname: {
        type: String
    },
    chats: {
        type: [Object]
    }
})

module.exports = mongoose.model('Chat', ChatModel);