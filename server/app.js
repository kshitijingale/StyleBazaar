const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');

// Routes
const authRoutes = require('./routes/auth')
const userRoutes = require('./routes/user')
const categoryRoutes = require('./routes/category')
const productRoutes = require('./routes/product')

const app = express();

// DB Connection
require('./config/db').connect();

// Middleware
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cors());
app.use(cookieParser())


app.use('/api', authRoutes);
app.use('/api', userRoutes);
app.use('/api', categoryRoutes);
app.use('/api', productRoutes);

module.exports = app;