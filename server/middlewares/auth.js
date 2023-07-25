const config = require('../config')
const jwt = require('jsonwebtoken')
const customError = require('../utils/customError')

exports.isSignedIn = (req, res, next) => {
    try {
        const token = req.cookies.token || req.headers.authorization.split(" ")[1]

        // Check if token doesn't exist
        if (!token) {
            throw new customError("Access Denied", 400)
        }

        // Verify token
        const decode = jwt.verify(token, process.env.JWT_SECRET)
        req.user = decode;

    } catch (error) {
        console.log(error);
        res.status(error.code || 500).json({
            success: false,
            message: error.message
        })
    }
    next();

}

exports.isAuthenticated = (req, res, next) => {
    const checker = req.profile && req.user && req.profile._id == req.user._id

    if (!checker) {
        res.status(403).json({
            success: false,
            message: "Access Denied"
        })
    }
    next()
}

exports.isAdmin = (req, res, next) => {

    if (req.profile.role === "USER") {
        res.status(403).json({
            success: false,
            message: "You are not admin"
        })
    }

    next()
}