const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

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

userSchema.pre('save', async function(next){
    this.password = await bcrypt.hash(this.password, 10);
    next();
});

userSchema.methods.checkPassword = function(password){
    return bcrypt.compare(password, this.password);
};

module.exports = mongoose.model("userModel",userSchema);