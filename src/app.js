const express = require("express");
const path = require('path');
const app = express();
const {productRouter} = require("./routes/product.route");

app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.urlencoded({extended: true}));

app.use("/api",productRouter);

exports.app = app;

