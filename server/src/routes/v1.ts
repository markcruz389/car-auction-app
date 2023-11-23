import express from "express";

import authRouter from "./auth/auth.router";
import auctionRouter from "./auction/auction.router";
import bidRouter from "./bid/bid.router";

const api = express.Router();

api.use("/auth", authRouter);
api.use("/auction", auctionRouter);
api.use("/bid", bidRouter);

export default api;
