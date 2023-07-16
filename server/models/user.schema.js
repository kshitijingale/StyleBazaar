const mongoose = require('mongoose');
const bcryptjs = require('bcryptjs');

const userSchema = mongoose.Schema({
    name: {
        type: String,
        required: [true, "Name is required"],
        maxLength: [50, "Name should be less than 50 characters"]
    },
    email: {
        type: String,
        unique: true,
        required: [true, "Email is required"]
    },
    password: {
        type: String,
        required: true
    },
    userinfo: {
        type: String,
        trim: true
    },
    role: {
        type: String,
        enum: ['USER', 'SELLER', 'MODERATOR', 'ADMIN'],
        default: 'USER'
    },
    purchases: {
        type: Array,
        default: []
    }
}, {
    timestamps: true
})

// Encrypting password before saving
userSchema.pre('save', async function (next) {
    if (!this.isModified("password")) {
        return next();
    }
    this.password = await bcryptjs.hash(this.password, 10)
    next();
})

userSchema.methods = {
    comparePassword: async function (enteredPassword) {
        return await bcryptjs.compare(enteredPassword, this.password)
    }
}

module.exports = mongoose.model('User', userSchema)