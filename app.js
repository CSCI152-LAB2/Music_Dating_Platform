const express = require('express');

const app = express();

app.use(express.json) //parses the data in POST and PUT requests which allows us to extract information from the request body
app.use(express.urlencoded({ extended: true }))