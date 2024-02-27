const User = require('../models/User');
const loginUser = require('./loginUser');

const getProfile = async (req, res) => {
    const { username } = req.body;
    try {
        console.log('successfully sent profile data from backend');
        const userObject = await User.findOne(
            { username }
        )
        res.status(200).send(userObject);
    } catch (err) {
        res.send(err.message);
    }
}

module.exports = getProfile;