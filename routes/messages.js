const express = require('express');
const router = express.Router();
const path = require('path');
const { accessChat } = require('../controllers/chatController');

router.get('^/$|/message(.html)?', (req, res) => {
    res.sendFile(path.join(__dirname, '..', 'views', 'messages.html'));
})

router.post('^/$|/message(.html)?', accessChat);

module.exports = router;