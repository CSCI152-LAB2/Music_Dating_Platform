const User = require('./../models/User');
const loginUser = require('./loginUser');
const bcrypt = require('bcrypt');

const finishSignup = async (req, res) => {
    const { username, password } = req.body;
    if (loginUser) { //might need to change to verify that a user is logged in later
        const findUser = await User.findOneAndUpdate(
            { username: username },
            { $set: { location, sex, sexualPreference, userID, likedUsers, matchedUsers } = req.body },
            { new: true }
        );
        res.status(200).json({ "message": "User data succesfully updated" });
    } else {
        res.status(401).json({ "message": "unable to update user data" });
    }
}

module.exports = finishSignup;