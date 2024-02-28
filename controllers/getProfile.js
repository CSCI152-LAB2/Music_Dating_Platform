const User = require('../models/User');
const jwt = require('jsonwebtoken');
const loginUser = require('./loginUser');

const getProfile = async (req, res) => {
    const verified_jwt = jwt.verify(req.cookies.token, process.env.SECRET_STR);
    if (verified_jwt) {
        console.log('JWT successfully verified');
    } else {
        return res.redirect('/login');
    }
    const { username } = verified_jwt;
    try {
        console.log('successfully sent profile data from backend');
        const userObject = await User.findOne(
            { username }
        )
        console.log(userObject);
        res.status(200).send(userObject);
    } catch (err) {
        res.send(err.message);
    }
}

module.exports = getProfile;