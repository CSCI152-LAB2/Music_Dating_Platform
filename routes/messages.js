const express = require('express');
const router = express.Router();
const path = require('path');
const { archiveChat, getChats, getUser } = require('../controllers/chatController');

/*router.get('^/$|/message(.html)?', (req, res) => {
router.get('^/$|/message(.html)?', (req, res) => {

    res.sendFile(path.join(__dirname, '..', 'views', 'messages.html'));
})*/


router.get('^/$|/message(.html)?otheruser', getChats);

//router.get('^/$|/message(.html)?', getUser);

router.post('^/$|/message(.html)?', archiveChat);
//router.post('^/$|/message(.html)?', accessChat);

module.exports = router;