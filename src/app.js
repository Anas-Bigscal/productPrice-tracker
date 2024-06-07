const express = require("express");
const path = require('path');
const { indexRouter } = require("./routes/index.route")

const app = express();

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use(express.static(path.join(process.cwd(), 'src' , 'public')));
app.use(express.json());
app.use(express.urlencoded({ extended : false }));

app.use(indexRouter);

exports.app = app;
