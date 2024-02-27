const express = require('express');
const router = express.Router();
const path = require('path');
const getProfile = require('../controllers/getProfile');

/*router.get('^/$|/profilepage(.html)?', (req, res) => {
    res.send(path.join(__dirname, '..', 'views', 'profilepage.html'))
})*/

router.get('^/$|/profile(.html)?', getProfile);

module.exports = router;