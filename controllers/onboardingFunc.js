const User = require('./../models/User');
const loginUser = require('./loginUser');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken')

const finishSignup = async (req, res) => {
    console.log("finishSignup has run from onboardingFunc.js")                 // for testing purposes only
    const token = req.cookies.token;
    const { topGenre, sex, sexualPreference, age, location } = req.body;
    console.log('topGenre from request is ', topGenre);
    console.log('session ID:', token)                   // for testing purposes
    const verified_token = jwt.verify(req.cookies.token, process.env.SECRET_STR)
    if (!verified_token) {
        return res.redirect('/signup');
    }
    const { username } = verified_token;
    console.log('username from token: ', username)                       // for testing purposes 
    //const { username, password, firstname, lastname, dob, location, sex, sexualPreference } = req.body;
    //const { topGenre, username, password, firstname, lastname, dob, location, sex, sexualPreference } = req.body.data;
    //const loginResult = await loginUser(req, res);
    //if (loginResult && loginResult.token) {
    try {
        const findUser = await User.findOneAndUpdate(
            { username: username },
            //{ $set: { firstname, lastname, dob, location, sex, sexualPreference, topGenre } },
            { $set: { topGenre, sex, sexualPreference, age, location } },
            { new: true }
        );

        if (findUser) {
            console.log(findUser);                                      // for testing purposes
            console.log('User updated successfully');
            res.status(200).json({ message: "User data successfully updated" });
        } else {
            res.status(404).json({ message: "User not found" });
        }
    } catch (error) {
        //console.error('Error updating user data:', error);
        res.status(500).json({ message: "Internal Server Error" });
    } //else {
    //res.status(401).json({ message: "Unable to update user data" });
    //}
    console.log("finishSignup has finished running from onboardingFunc.js")           // for testing purposes only
}

module.exports = { finishSignup };