const mongoose = require('mongoose');

const categorySchema = mongoose.Schema({
    name: {
        type: String,
        required: [true, "Category name is required"],
        trim: true,
        unique: true,
        maxLength: [32, "Category name should be less than 32 characters"]
    }
}, {
    timestamps: true
})

module.exports = mongoose.model('Category', categorySchema);