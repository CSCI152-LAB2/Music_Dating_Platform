const express = require('express');
const router = express.Router();
const path = require('path');

router.get('^/$|/signup(.html)?', (req, res) => {
    res.sendFile(path.join(__dirname, '..', 'views', 'signup.html'));
})

router.post('^/$|/signup(.html)?', (req, res) => {

})

module.exports = router;