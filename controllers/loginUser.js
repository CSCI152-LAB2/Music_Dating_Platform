const User = require('../models/User');
const bcrypt = require('bcrypt');
const cookie = require('cookie-parser');
const jwt = require('jsonwebtoken');
const path = require('path');

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
                const token = jwt.sign({ username }, process.env.SECRET_STR, {
                    expiresIn: '1h'
                });

                res.cookie("token", token, {
                    httpOnly: false
                })
                console.log(({ "Success": "User logged in", "token": token, "User": user }))
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