const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const ChatModel = new Schema({
    chatName: {
        type: String
    },
    users: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User'
        }
    ],
},
    {
        timestamps: true,
    }
)

module.exports = mongoose.model('Chat', ChatModel);