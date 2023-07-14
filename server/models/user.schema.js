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
userSchema.pre('save', async (next) => {
    if (!this.isModified) {
        this.password = await bcryptjs.hash(this.password, 10)
    }
    next();
})

userSchema.methods = {
    comparePassword: async (enteredPassword) => {
        return await bcryptjs.compare(enteredPassword, this.password)
    }
}