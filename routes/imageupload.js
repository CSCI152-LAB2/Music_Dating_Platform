const express = require('express');
const router = express.Router();
const imageUpload = require('../controllers/imageUpload');
const authUser = require('../middlewares/verifyJWT');

console.log('is this reached');
router.post('/upload', authUser.verifyCookie, imageUpload.uploadPhoto);

module.exports = router;
