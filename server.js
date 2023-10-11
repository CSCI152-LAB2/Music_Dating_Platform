//server.js file
const express = require('express')
const app = express();
const fs = require('fs');
const PORT = 5501

app.use(express.json()) //parses the data in POST and PUT requests which allows us to extract information from the request body
app.use(express.urlencoded({ extended: true }))

//app.use('/', express.static('/public', 'views'));
app.use('/', express.static('views'));

app.use('/', require('./routes/landing.js'));

app.listen(PORT, () => {
    console.log(`server running on port: ${PORT}`)
})