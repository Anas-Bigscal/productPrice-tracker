const mongoose = require("mongoose");
const { getMaxListeners } = require("./product.model");

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true
    },
    password: {
        type: String,
        required: true,
        minlength: 6,
        maxlength: 14
    },
    isDelete:{
        type: Boolean,
        default: false,
        required: true
    },
    createdAt:{
        type:Date,
        default: Date.now,
        required: true
    },
    updatedAt:{
        type: Date,
        default: Date.now,
        required: true
    }
});

module.exports = mongoose.model("userModel",userSchema);