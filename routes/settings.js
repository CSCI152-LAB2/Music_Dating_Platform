const express = require('express');
const router = express.Router();
const path = require('path');

router.get('^/$|/settings(.html)?', (req, res) => {
    res.send(path.join(__dirname, '..', 'views', 'settings.html'));
})

router.put('^/$|/settings(.html)?', (req, res) => {
    //
})

module.exports = router;