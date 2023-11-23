import express from "express";
import { userAuthChecker } from "../../middlewares/authChecker";
import { addBidValidator } from "./bid.validators";
import inputValidationChecker from "../../middlewares/inputValidationChecker";
import { httpPostBid } from "./bid.controller";

const bidRouter = express.Router();

bidRouter.post(
    "/",
    userAuthChecker,
    addBidValidator,
    inputValidationChecker,
    httpPostBid
);

export default bidRouter;
