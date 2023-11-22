import express from "express";

import { loginValidator, registerValidator } from "./auth.validators";
import { httpPostRegister, httpPostLogin } from "./auth.controller";
import inputValidationChecker from "../../middlewares/inputValidationChecker";

const authRouter = express.Router();

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
