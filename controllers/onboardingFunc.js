import totalGenre from '../views/getSpotify'
const User = require('./../models/User');
const loginUser = require('./loginUser');
const bcrypt = require('bcrypt');

const finishSignup = async (req, res) => {

    const { username, password, firstname, lastname, dob, location, sex, sexualPreference } = req.body;
    const loginResult = await loginUser(req, res);
    if (loginResult && loginResult.token) {
        try {
            const findUser = await User.findOneAndUpdate(
                { username: username },
                { $set: { firstname, lastname, dob, location, sex, sexualPreference, topGenre } },
                { new: true }
            );

            if (findUser) {
                res.status(200).json({ message: "User data successfully updated" });
            } else {
                res.status(404).json({ message: "User not found" });
            }
        } catch (error) {
            //console.error('Error updating user data:', error);
            res.status(500).json({ message: "Internal Server Error" });
        }
    } else {
        res.status(401).json({ message: "Unable to update user data" });
    }
}

module.exports = finishSignup;