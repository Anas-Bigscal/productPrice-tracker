const {Router} = require("express");
const {join} = require("node:path")
const {getProductDetail ,getPrice, getProduct} = require("../controllers/product.controller");
const { checkLogIn, isAuthenticated } = require("../middlewares/auth.middleware");
const productRouter = Router();

productRouter.get("/getProductDetail", isAuthenticated,getProduct);
// productRouter.get("/getProductDetail",(req,res)=>{
//     res.sendFile(join(process.cwd() + "/src/public/home.html"));
// });

productRouter.post("/getProductDetail",getProductDetail);

productRouter.get("/getPrice",getPrice);

exports.productRouter = productRouter;