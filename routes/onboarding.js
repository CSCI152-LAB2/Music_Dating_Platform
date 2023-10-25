const express = require('express');
const router = express.Router();
const path = require('path');

router.get('^/$|/onboarding(.html)?', (req, res) => {
    res.send(path.join(__dirname, '..', 'views', 'onboarding.html'));
})

router.post('/onboarding(.html)', (req, res) => {

})

module.exports = router;