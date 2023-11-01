const express = require('express');
const router = express.Router();
const path = require('path');
const onboarding = require('./../controllers/onboarding');

router.get('^/$|/onboarding(.html)?', (req, res) => {
    res.send(path.join(__dirname, '..', 'views', 'onboarding.html'));
})

router.post('/onboarding(.html)', onboarding);

module.exports = router;