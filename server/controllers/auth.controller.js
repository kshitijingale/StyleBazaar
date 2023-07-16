const User = require('../models/user.schema')
const customError = require('../utils/customError')
const JWT = require('jsonwebtoken')
const config = require('../config/index')

exports.signup = async (req, res) => {
    try {
        const { name, email, password } = req.body;

        // Validate data
        if (!name || !email || !password) {
            throw new customError("All fields are required", 400)
        }

        // check if user already exist
        const existingUser = await User.findOne({ email })
        if (existingUser) {
            throw new customError("User already exists", 400)
        }

        const user = await User.create({
            name,
            email,
            password
        })

        res.status(200).json({
            success: true,
            message: "User created successfully",
            user
        })

    } catch (error) {
        console.log(error);
        res.status(error.code || 500).json({
            success: false,
            message: error.message
        })
    }
}

exports.signin = async (req, res) => {
    try {
        const { email, password } = req.body

        // Validate fields
        if (!email || !password) {
            throw new customError("All fields are required", 400)
        }

        const user = await User.findOne({ email })

        // check if user exist
        if (!user) {
            throw new customError("User not found", 404)
        }

        if (await user.comparePassword(password)) {
            const { _id, name, role } = user

            const token = await JWT.sign({ _id, email }, config.JWT_SECRET, { expiresIn: '2h' })

            const cookieOptions = {
                expires: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000),
                httpOnly: true
            }

            return res.status(200).cookie('token', token, cookieOptions).json({
                success: true,
                message: "User signed in successfully",
                userInfo: {
                    _id,
                    name,
                    role,
                    email
                }
            })
        }

        throw new customError("Incorrect password", 400)

    } catch (error) {
        console.log(error);
        res.status(error.code || 500).json({
            success: false,
            message: error.message
        })
    }
}