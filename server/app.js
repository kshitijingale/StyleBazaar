const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const authRoutes = require('./routes/auth')

const app = express();

// DB Connection
require('./config/db').connect();

// Middleware
app.use(cors());
app.use(cookieParser())
app.use(express.urlencoded({ extended: true }))


app.use('/api', authRoutes);

module.exports = app;