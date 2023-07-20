const User = require('../models/user.schema')
const Order = require('../models/order.schema')
const customError = require('../utils/customError')

exports.getUserById = async (req, res, next, id) => {
    try {


        const user = await User.findById(id)

        // if user not found
        if (!user) {
            throw new customError("User not found", 404)
        }

        // unnecessary data
        user.password = undefined
        user.createdAt = undefined
        user.updatedAt = undefined

        req.profile = user
        next()

    } catch (error) {
        console.log(error);
        res.status(error.code || 500).json({
            success: false,
            message: error.message
        })
    }
}

exports.getUser = (req, res) => {
    try {
        res.status(200).json({
            success: true,
            user: req.profile
        })

    } catch (error) {
        console.log(error);
        res.status(error.code || 500).json({
            success: false,
            message: error.message
        })
    }
}

exports.updateUser = async (req, res) => {
    try {
        const updatedUser = await User.findByIdAndUpdate(req.profile._id, req.body)

        if (!updatedUser) {
            throw new customError("Not authorized to update user", 400)
        }

        updatedUser.password = undefined

        res.status(200).json({
            success: true,
            updatedUser
        })

    } catch (error) {
        console.log(error);
        res.status(error.code || 500).json({
            success: false,
            message: error.message
        })
    }
}

exports.getOrders = async (req, res) => {
    try {
        const order = await Order.find({ user: req.profile._id }).populate('user', '_id name')


        if (!order) {
            throw new customError("Not authorized to get order", 400)
        }

        res.status(200).json({
            success: true,
            order
        })

    } catch (error) {
        console.log(error);
        res.status(error.code || 500).json({
            success: false,
            message: error.message
        })
    }
}

exports.pushOrderInPurchaseList = async (req, res, next) => {
    try {
        let purchases = []
        req.body.order.products.forEach(product => {
            purchases.push({
                _id: product._id,
                name: product.name,
                description: product.description,
                quantity: product.quantity,
                category: product.category,
                amount: req.body.order.amount,
                transactionId: req.body.order.transactionId
            })
        });

        // Save to DB
        await User.findByIdAndUpdate(
            { _id: req.profile._id },
            { $push: { purchases: purchases } },
            { $new: true },
            (error, purchases) => {
                if (error) {
                    throw new customError("Unable to save purchase list", 400)
                }
                next()
            }
        )

    } catch (error) {
        console.log(error);
        res.status(error.code || 500).json({
            success: false,
            message: error.message
        })
    }
}