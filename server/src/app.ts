import express from "express";
import cors from "cors";

import api from "./routes/v1";
import errorHandler from "./middlewares/errorHandler";
import { errorResponse, ERROR_TYPE } from "./_utils/errorResponse";

const app = express();

app.use(cors({ origin: process.env.CLIENT_ORIGIN }));
app.use(express.json());

app.use("/api/v1", api);

app.use("*", (req, res) => {
    return errorResponse({
        res,
        statusCode: 404,
        errorData: {
            type: ERROR_TYPE.NOT_FOUND,
            message: `${req.baseUrl} not found`,
        },
    });
});

app.use(errorHandler);

export default app;
