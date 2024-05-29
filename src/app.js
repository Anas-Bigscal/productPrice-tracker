const express = require("express");
const app = express();
const {productRouter} = require("./routes/product.route");

app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.use("/api",productRouter);

exports.app = app;

