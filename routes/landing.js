const express = require('express');
const router = express.Router();
const path = require('path');

router.get('/', (req, res) => {
    //const filepath = ('public', 'views', 'frontpage.html');
    //const filePath = path.join(__dirname, 'public', 'views', 'frontpage.html');
    const filePath = path.join(__dirname, 'views', 'frontpage.html');
    res.sendFile(filePath, (err) => {
        if (err) {
            console.error(err);
            res.status(err.status || 500).send('Internal Server Error');
        }
    })
})

module.exports = router;