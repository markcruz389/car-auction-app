import express from "express";
import cookieParser from "cookie-parser";

import api from "./routes/v1";

import errorHandler from "./middlewares/errorHandler";
import { errorResponse, ERROR_TYPE } from "./_utils/errorResponse";

const app = express();

app.use(express.json());
app.use(cookieParser());

app.use("/api/v1", api);

app.use("*", (req, res) => {
    return errorResponse({
        res,
        statusCode: 404,
        errorData: {
            error: ERROR_TYPE.NOT_FOUND,
            message: `${req.baseUrl} not found`,
        },
    });
});

app.use(errorHandler);

export default app;
