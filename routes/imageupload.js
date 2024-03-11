const express = require('express');
const router = express.Router();
const imageUpload = require('../controllers/imageUpload');
const authUser = require('../middlewares/authUser');

router.post('/upload/:userId', authUser, imageUpload.uploadPhoto);

module.exports = router;
