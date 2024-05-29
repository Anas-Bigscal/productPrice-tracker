const Router = require("express");
const {getProductPrice} = require("../controllers/product.controller");
const productRouter = Router();

productRouter.get("/getProductPrice",getProductPrice);

exports.productRouter = productRouter;