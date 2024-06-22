const {Router} = require("express");
const authRouter = Router();

const AUTH_ROUTE = require("../controllers/auth.controller");
const passport = require("passport");

authRouter.get("/register", AUTH_ROUTE.addUser);
authRouter.post("/register", AUTH_ROUTE.addUserProcess);
authRouter.get("/login",checkLogIn, AUTH_ROUTE.loginUser);
// authRouter.post("/login",AUTH_ROUTE.loginProcess)
authRouter.post("/login",
    passport.authenticate('local',{
        session: true,
        successRedirect: "/getProductDetail",
        failureFlash: "Enter proper Credentials"
    })
);

authRouter.get('/logout',AUTH_ROUTE.logout);

exports.authRouter = authRouter;