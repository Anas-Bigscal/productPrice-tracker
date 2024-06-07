const {Router} = require("express");
const authRouter = Router();

const AUTH_ROUTE = require("../controllers/auth.controller");

authRouter.get("/register", AUTH_ROUTE.addUser);

exports.authRouter = authRouter;