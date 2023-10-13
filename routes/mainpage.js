const express = require('express');
const router = express.Router();
const path = require('path');

router.get('^/$|/main(.html)?', (req, res) => {
    res.sendFile(path.join(__dirname, '..', 'views', 'mainpage.html'));
})

module.exports = router;