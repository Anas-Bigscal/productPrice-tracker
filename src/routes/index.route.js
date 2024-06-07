const {Router}  = require("express");
const indexRouter = Router();
// const indexRouter = require("express").Router();

const { authRouter } = require("./auth.route");
const { productRouter } = require("./product.route");

indexRouter.use("/auth", authRouter);
indexRouter.use("/user/:userId",productRouter);


exports.indexRouter = indexRouter;