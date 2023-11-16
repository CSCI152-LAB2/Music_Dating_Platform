const express = require('express');
const router = express.Router();
const path = require('path');
const { accessChat } = require('../controllers/chatController');

router.get('^/$|/messages(.html)?', (req, res) => {
    res.sendFile(path.join(__dirname, '..', 'views', 'messages.html'));
})

router.post('^/$|/messages(.html)?', accessChat);

module.exports = router;