const express = require('express');
const { builtinModules } = require('module');
const router = express.Router();
const path = require('path');
const loginUser = require('../controllers/loginUser.js');

router.get('^/$|/login(.html)?', (req, res) => {
    res.sendFile(path.join(__dirname, '..', 'views', 'login.html'));
})

router.post('^/$|/login(.html)?', loginUser);

module.exports = router;