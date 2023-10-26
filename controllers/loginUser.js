const User = require('../models/User');
const bcrypt = require('bcrypt');
const cookie = require('cookie-parser');
const jwt = require('jsonwebtoken');
const path = require('path');

/*const loginUser = async (req, res) => {
    const { username, password } = req.body;
    if (!username || !password) {
        res.status(400).json({ "message": "Username or password required" });
    } else {
        const person = User.findOne({ username: username }, '+password');
        if (person) {
            const verify = await bcrypt.compare(password, person.password);
            if (verify) {
                const token = jwt.sign({ user: User.username }, process.env.SECRET_STR, {
                    expiresIn: process.env.LOGIN_EXPIRES
                });
                res.json({ "Success": "User logged in", "token": token, "User": person }); //User is sent in json response for testing. Should be removed in production
            } else res.status(401).json({ "message": "Password is incorrect" });
        } else {
            res.status(401).json({ "message": "Username does not exist" });
        }
    }
}*/

const loginUser = async (req, res) => {
    const { username, password } = req.body;

    try {
        if (!username || !password) {
            return res.status(400).json({ "message": "Username or password required" });
        }

        const user = await User.findOne({ username: username }, '+password');

        if (user) {
            const verify = await bcrypt.compare(password, user.password);

            if (verify) {
                const token = jwt.sign({ user: user.username }, process.env.SECRET_STR, {
                    expiresIn: process.env.LOGIN_EXPIRES
                });
                return res.json({ "Success": "User logged in", "token": token, "User": user });
            } else {
                return res.status(401).json({ "message": "Password is incorrect" });
            }
        } else {
            return res.status(401).json({ "message": "Username does not exist" });
        }
    } catch (error) {
        console.error(error);
        return res.status(500).json({ "message": "Internal server error" });
    }
};


module.exports = loginUser;