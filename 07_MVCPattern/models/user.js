const mongoose = require('mongoose')

// Schema
const userSchema = mongoose.Schema({
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    jobTittle: {
        type: String,
    },
    gender: {
        type: String
    }
} /*,{ timestamps: true } */)

const User = mongoose.model("users", userSchema)

module.exports = User