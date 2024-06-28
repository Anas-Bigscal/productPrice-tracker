const express = require("express");
const path = require('path');
const methodOverride = require('method-override');
const flash = require('connect-flash');
const passport = require('passport');
const session = require('express-session');

const store = require("./utils/mongo-init");
const { indexRouter } = require("./routes/index.route");
const { errorhandler, notFoundHandler } = require('./middlewares/error.middleware')

const app = express();

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
// app.use(express.static(path.join(process.cwd(), 'src' , 'public')));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(methodOverride("__method"));

app.use(
    session({
        store: store,
        secret: process.env.secretKey,
        resave: false,
        saveUninitialized: false,
        cookie: { secure: false, maxAge: 1000 * 60 * 60 * 24 }
    })
);

app.use(flash());
app.use(passport.initialize());
app.use(passport.session());

app.use(indexRouter);

app.use(notFoundHandler);
app.use(errorhandler);

exports.app = app;
