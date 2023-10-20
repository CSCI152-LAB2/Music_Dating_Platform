const express = require('express');
const router = express.Router();
const path = require('path');

router.get('^/$|/messages(.html)?', (req, res) => {
    res.sendFile(path.join(__dirname, '..', 'views', 'messages.html'));
})

module.exports = router;