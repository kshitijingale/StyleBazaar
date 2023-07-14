const mongoose = require('mongoose');

const orderSchema = mongoose.Schema({
    products: [{
        productId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Product',
            required: [true, "Product Id is required"]
        },
        count: {
            type: Number,
            required: true
        },
        price: {
            type: Number,
            required: true
        }
    }],
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    address: {
        type: String,
        required: true
    },
    phoneNumber: {
        type: Number,
        required: true
    },
    amount: {
        type: Number,
        required: true
    },
    transactionId: String,
    status: {
        type: String,
        enum: ["ORDERED", "SHIPPED", "DELIVERED", "CANCELLED"],
        default: "ORDERED"
    },
    paymentMode: {
        type: String,
        enum: ["COD", "UPI", "CREDITCARD", "WALLAT"],
    }
}, {
    timpstamps: true
})

module.exports = mongoose.model('Order', orderSchema)