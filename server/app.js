const express = require('express');
const app = express();
// DB Connection
require('./config/db').connect();

app.use('/', (req, res) => {
    res.send('T-shirt store')
})

module.exports = app;