import express from "express";

import authRouter from "./auth/auth.router";
import auctionRouter from "./auction/auction.router";

const api = express.Router();

api.use("/auth", authRouter);
api.use("/auction", auctionRouter);

export default api;
