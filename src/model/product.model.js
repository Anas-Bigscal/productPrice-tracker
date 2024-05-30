const mongoose = require("mongoose");

const productPriceSchema = new mongoose.Schema({
    productLink : {
        type: String
    },
    productPrice: {
        type: String
    },
    userEmail: {
        type: String
    }
});

module.exports = mongoose.model('productDetailModel',productPriceSchema)