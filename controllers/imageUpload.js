const User = require('../models/User');
const jwt = require('jsonwebtoken');
const path = require('path');
const multer = require('multer');

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './uploads/')
    },
    filename: function (req, file, cb) {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
        const extension = path.extname(file.originalname); 
        cb(null, file.fieldname + '-' + uniqueSuffix + extension);
    }
})

const upload = multer({ storage: storage }).single('avatar');

exports.uploadPhoto = (req, res) => {
    upload(req, res, async (err) => {
        if (err) {
            return res.status(500).send({ error: err.message });
        }
        if (!req.file) {
            return res.status(400).send('No file uploaded');
        }

        try {
            const verified_jwt = jwt.verify(req.cookies.token, process.env.SECRET_STR);
            if (verified_jwt) {
                console.log('JWT successfully verified');
            } else {
                return res.redirect('/login');
            }
            const { username } = verified_jwt;
            const user = await User.findOne({ username });
            if (!user) {
                return res.status(404).send('User not found');
            }

            user.profilePic = req.file.path; // You might want to adjust the path as needed

            await user.save();
            res.send({ message: 'Profile picture updated successfully', profilePic: user.profilePic });
        } 
        catch (error) {
            res.status(500).send({ error: error.message });
        }
    });
};
