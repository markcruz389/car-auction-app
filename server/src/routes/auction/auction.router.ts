import express from "express";

import { createAuctionValidator } from "./auction.validators";
import inputValidationChecker from "../../middlewares/inputValidationChecker";
import { httpPostCreateAuction } from "./auction.controller";
import { userAuthChecker } from "../../middlewares/authChecker";

const auctionRouter = express.Router();

auctionRouter.post(
    "/",
    userAuthChecker,
    createAuctionValidator,
    inputValidationChecker,
    httpPostCreateAuction
);

export default auctionRouter;
