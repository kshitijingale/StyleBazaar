const mongoose = require('mongoose');

const productSchema = mongoose.Schema({
    name: {
        type: String,
        required: [true, "Product name is required"],
        trim: true,
        maxLength: [50, "Product name should be less than 50 characters"]
    },
    description: {
        type: String,
        required: [true, "Product description is required"],
        trim: true,
        maxLength: [2000, "Product description should be less than 2000 characters"]
    },
    price: {
        type: Number,
        required: [true, "Product price is required"],
        maxLength: [6, "Product price should be less than 6 digits"]
    },
    category: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Category"
    },
    stock: {
        type: Number,
        required: true,
    },
    sold: {
        type: Number,
        default: 0
    },
    photo: {
        data: Buffer,
        contentType: String
    }
}, {
    timestamps: true
})

module.exports = mongoose.model('Product', productSchema)