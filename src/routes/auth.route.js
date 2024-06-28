const {Router} = require("express");
const authRouter = Router();
const passport = require("passport");

const AUTH_ROUTE = require("../controllers/auth.controller");
const { checkLogIn, isAuthenticated} = require('../middlewares/auth.middleware')

authRouter.get("/register", AUTH_ROUTE.addUser);
authRouter.post("/register", AUTH_ROUTE.addUserProcess);
authRouter.get("/login",checkLogIn, AUTH_ROUTE.loginUser);
// authRouter.post("/login",AUTH_ROUTE.loginProcess)
authRouter.post("/login",
    passport.authenticate('local',{
        session: true,
        successRedirect: "/user/getProductDetail",
        failureFlash: "Enter proper Credentials"
    })
);

authRouter.get('/logout',AUTH_ROUTE.logout);

exports.authRouter = authRouter;