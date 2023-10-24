//handles registering users and password encryption
const bcrypt = require('bcrypt');
const User = require('../models/User');
const jwt = require('jsonwebtoken');

const registerUser = async (req, res) => {
    const { user, password } = req.body;
    if (!user || !password) { return res.status(400).json({ "message": "Username and password required" }); }

    const checkForDuplicate = await User.findOne({ username: user }).exec();
    if (checkForDuplicate) { return res.status(409).json({ "message": "Error: An account has aready been created using this username" }); }
    const hash = bcrypt.hash(password, 10);

    try {
        const new_user = await User.create({
            "username": user,
            "password": password
        });

        const token = jwt.sign({ user: User.username }, process.env.SECRET_STR, {
            expiresIn: process.env.LOGIN_EXPIRES
        });

        console.log(new_user);
        res.status(201).json({ "message": `New user ${user} created!`, "token": `${token}` });
    } catch (err) {
        res.status(500).json({ "message": err.message });
    }
}

module.exports = registerUser;