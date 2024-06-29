const mongoose = require("mongoose");

const productPriceSchema = new mongoose.Schema({
    productLink : {
        type: String
    },
    productPrice: {
        type: String
    },
    userId:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "userModel",
        required: true
    },
});

module.exports = mongoose.model('productDetailModel',productPriceSchema)