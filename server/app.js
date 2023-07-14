const express = require('express');

const app = express();

app.use('/', (req, res) => {
    res.send('T-shirt store')
})

module.exports = app;