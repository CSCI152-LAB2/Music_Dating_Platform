const express = require('express');
const router = express.Router();
const imageUpload = require('../controllers/imageUpload');

router.post('/upload:userId', imageUpload.uploadPhoto);

module.exports = router;
