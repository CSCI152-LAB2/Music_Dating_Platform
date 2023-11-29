const User = require('../models/User');
const loginUser = require('./loginUser');

const getProfile = async (req, res) => {
    const { username, password } = req.body;
    const login = await loginUser(req, res);

    if (login) {
        const currUser = User.findOne({ username })
            .exec((err, userObj) => {
                if (err) {
                    res.status(500).json({ "message": "Unable to " })
                } else {
                    res.json(userObj);
                }
            })
    } else {
        res.status(400).json({ "message": "Unable to login user - can't access profile" });
    }
}

module.exports = getProfile;