const express = require('express');
const router = express.Router();
const path = require('path');
const { getUsers, postLikeDislike } = require('../controllers/matchMaker');

router.get('^/$|/main(.html)?', (req, res) => {
    res.sendFile(path.join(__dirname, '..', 'views', 'main_page.html'));
})

router.get('^/$|/main(.html)?/users', getUsers);

router.put('^/$|/main(.html)?', postLikeDislike);

module.exports = router;