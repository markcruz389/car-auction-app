import express from "express";

import { loginValidator, registerValidator } from "./auth.validators";
import {
    httpGetLogout,
    httpPostRegister,
    httpPostLogin,
} from "./auth.controller";
import inputValidationChecker from "../../middlewares/inputValidationChecker";
import { isNotLoggedInChecker } from "../../middlewares/authChecker";

const authRouter = express.Router();

authRouter.get("/logout", isNotLoggedInChecker, httpGetLogout);
authRouter.post(
    "/register",
    registerValidator,
    inputValidationChecker,
    httpPostRegister
);
authRouter.post(
    "/login",
    loginValidator,
    inputValidationChecker,
    httpPostLogin
);

export default authRouter;
