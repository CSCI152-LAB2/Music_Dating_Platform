const express = require('express');
const { builtinModules } = require('module');
const router = express.Router();
const path = require('path');

router.get('^/$|/login(.html)?', (req, res) => {
    res.sendFile(path.join(__dirname, '..', 'views', 'login.html'));
})

module.exports = router;