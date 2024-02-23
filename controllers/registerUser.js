//handles registering users and password encryption
const bcrypt = require('bcrypt');
const User = require('../models/User');
const jwt = require('jsonwebtoken');

const registerUser = async (req, res) => {
    const { username, password, email } = req.body;         //variables from request body
    if (!username || !password || !email) { return res.status(400).json({ "message": "Username, password, and email are required when signing up" }); }     //if any required field is blank
    else {
        const checkForDuplicate = await User.findOne({ username: username }).exec();
        if (checkForDuplicate) { return res.status(409).json({ "message": "Error: An account has aready been created using this username" }); }
        const hash = await bcrypt.hash(password, 10);

        try {   //try to create new user
            const new_user = await User.create({
                "username": username,
                "password": hash,
                "email": email
            });

            const token = jwt.sign({ username, email }, process.env.SECRET_STR, {
                expiresIn: '1h'
            });

            res.cookie("token", token, {
                httpOnly: true
            })

            console.log(new_user);
            console.log('\nToken:', token)
            res.status(201).json({ "message": `New user created!`, "User": new_user, "token": token }); //${new_user} should only be used for testing
        } 
        catch (err) {                                                                                //will be replaced when project is deployed
            res.status(500).json({ "message": err.message });                                          //as it is a security risk
        }
    }
}

module.exports = registerUser;
