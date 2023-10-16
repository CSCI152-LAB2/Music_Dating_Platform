const express = require('express');
const router = express.Router();
const path = require('path');

router.get('^/$|/profilepage(.html)?', (req, res) => {
    res.send(path.join(__dirname, '..', 'views', 'profilepage.html'))
})

module.exports = router;