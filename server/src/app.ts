import express from "express";
import cookieParser from "cookie-parser";

import api from "./routes/v1";

import errorHandler, { CustomError } from "./middlewares/errorHandler";

const app = express();

app.use(express.json());
app.use(cookieParser());

app.use("/api/v1", api);

app.use("*", (req, _, next) => {
    const error = new CustomError(404, `${req.baseUrl} not found`);
    next(error);
});

app.use(errorHandler);

export default app;
