const multer = require('multer');
const User = require('../models/User');

const storage = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, 'uploads');
    },
    filename: function(req, file, cb) {
        cb(null, new Date().toISOString() + '-' + file.originalname);
    }
});

const upload = multer({ storage: storage }).single('photo');

app.post('/upload/:userId', (req, res) => {
    upload(req, res, async(err) => {
        if (err) {
            return res.status(500).send({ error: err.message });
        }
        if (!req.file) {
            return res.status(400).send('No file uploaded');
        }

        try {
            const user = await User.findById(req.params.userId);
            if (!user) {
                return res.status(404).send('User not found');
            }

            user.profilePic = req.file.path;

            await user.save();
            req.send({ message: 'Profile picture updated successfully', profilePic: user.profilePic });
        }
        catch {
            res.status(500).send({ error: error.messgae });
        }
    });
});

