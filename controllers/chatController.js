const Chat = require('../models/ChatModel');
const User = require('../models/User');

const accessChat = async (req, res) => {
    const { username } = req.body;

    if (!username) {
        return res.status(400).send({ "error": "userId missing in request" });
    }

    var isChat = await Chat.find({
        $and: [
            { users: { $elemMatch: { $eq: req.username } } },
            { users: { $elemMatch: { $eq: username } } }
        ]
    }).populate("users", "-password").populate("latestMessage");

    isChat = await User.populate(isChat, {
        path: 'latestMessage.sender',
        select: "name pic email",
    });

    if (isChat.length > 0) {
        res.send(isChat[0]);
    } else {
        const chatData = {
            chatName: "sender",
            users: [req.username, username]
        }
        try {
            const createdChat = await Chat.create(chatData);

            const FullChat = await Chat.findOne({ username: createdChat.username }).populate(
                "users",
                "-password"
            );
        } catch (err) {
            res.status(400);
            throw new Error(err.message);
        }
    }
}

module.exports = { accessChat };