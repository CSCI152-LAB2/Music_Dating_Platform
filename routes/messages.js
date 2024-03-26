const express = require('express');
const router = express.Router();
const path = require('path');
const { archiveChat } = require('../controllers/chatController');

router.get('^/$|/message(.html)?', (req, res) => {
    res.sendFile(path.join(__dirname, '..', 'views', 'messages.html'));
})

router.put('^/$|/message(.html)?', archiveChat);

module.exports = router;