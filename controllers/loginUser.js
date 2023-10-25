const User = require('../models/User');
const bcrypt = require('bcrypt');
const cookie = require('cookie-parser');
const jwt = require('jsonwebtoken');
const path = require('path');

const loginUser = async (req, res) => {
    const { user, pwd } = req.body;
    const person = User.findOne(user.username === User.username);
    if (person) {
        const verify = await bcrypt.compare(pwd, person.password);
        if (verify) {
            //Needs JWT logic
            res.json({ "Success": "User logged in" });
        } else res.status(401).json({ "message": "Password is incorrect" });
    } else {
        res.status(401).json({ "message": "Username does not exist" });
    }
}