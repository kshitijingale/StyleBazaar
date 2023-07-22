const Order = require('../models/order.schema')
const customError = require('../utils/customError')

exports.getOrderId = async (req, res, next, id) => {
    try {
        const order = await Order.findById(id)

        if (!order) {
            throw new customError("Order not found", 404)
        }

        req.order = order
        next()

    } catch (error) {
        console.log(error);
        res.status(error.code || 500).json({
            success: false,
            message: error.message
        })
    }
}

exports.createOrder = async (req, res) => {
    try {
        const order = await Order.create(rea.body.order)

        if (!order) {
            throw new customError("Order failed", 400)
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

exports.getOrders = async (req, res) => {
    try {
        const orders = await Order.find().populate("User", "_id name")

        if (!orders) {
            throw new customError("Orders not found", 400)
        }

        res.status(200).json({
            success: true,
            orders
        })
    } catch (error) {
        console.log(error);
        res.status(error.code || 500).json({
            success: false,
            message: error.message
        })
    }
}

exports.getOrderStatus = async (req, res) => {
    try {
        const status = await Order.schema.path("status").enumValues

        if (!status) {
            throw new customError("Status on found", 400)
        }

        res.status(200).json({
            success: true,
            status
        })

    } catch (error) {
        console.log(error);
        res.status(error.code || 500).json({
            success: false,
            message: error.message
        })
    }
}

exports.updateOrderStatus = async (req, res) => {
    try {
        const status = await Order.findOneAndUpdate(req.order._id, { $set: { status: req.body.status } })

        if (!status) {
            throw new customError("Status on found", 400)
        }

        res.status(200).json({
            success: true,
            status
        })

    } catch (error) {
        console.log(error);
        res.status(error.code || 500).json({
            success: false,
            message: error.message
        })
    }
}