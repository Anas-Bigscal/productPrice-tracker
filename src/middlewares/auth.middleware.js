require('dotenv').config();
const createError = require('http-errors');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const userModel = require('../model/user.model');

passport.use(
    new LocalStrategy({
        usernameField: "email",
        passwordField: "password"
    }, async (email, password, cb) => {
        try {

            const validateEmail = await userModel.findOne({ email, isDelete: false });
            if (!validateEmail) throw createError(404, "Enter proper Credentials");

            const validatePassword = await validateEmail.checkPassword(password);
            if (!validatePassword) throw createError(404, "Enter proper Credentials");

            cb(null, validateEmail);
        } catch (error) {
            cb(error);
        }
    }),
);

passport.serializeUser((user, done) => {
    if (user) done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
    try {
        const user = await userModel.find({ _id: id, isDelete: false });
        done(null, user);
    } catch (error) {
        done(error);
    }
});

exports.isAuthenticated = (req, res, next) => {
    try {
        if (req.isAuthenticated()) return next();
    } catch (error) {
        next(error);
    }
};

exports.checkLogIn = (req, res, next) => {
    try {
        if (req.isAuthenticated()) return res.send("INSIDE AUTH MIDLLEWARE UR LOGGED IN");
        next();
    } catch (error) {
        next(error);
    }
}
