const Router = require("express");
const {join} = require("node:path")
const {getProductPrice ,getPrice} = require("../controllers/product.controller");
const productRouter = Router();

productRouter.get("/getProductDetail",(req,res)=>{
    res.sendFile(join(process.cwd() + "/src/public/home.html"));
});

productRouter.post("/getProductDetail",getProductPrice);

productRouter.get("/getPrice",getPrice);

exports.productRouter = productRouter;