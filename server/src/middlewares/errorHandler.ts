import { Request, Response, NextFunction } from "express";

import {
    errorResponse,
    ErrorStatusCode,
    ErrorType,
    ErrorData,
} from "../_utils/errorResponse";

// Resources
// - https://dev.to/qbentil/how-to-write-custom-error-handler-middleware-in-expressjs-using-javascript-29j1
// - https://reflectoring.io/express-error-handling/

class CustomError extends Error {
    statusCode: ErrorStatusCode;
    error: ErrorType;

    constructor(
        statusCode: ErrorStatusCode,
        error: ErrorType,
        message: string
    ) {
        super(message);

        Object.setPrototypeOf(this, new.target.prototype);
        this.name = Error.name;
        this.statusCode = statusCode;
        this.error = error;
        Error.captureStackTrace(this);
    }
}

const errorHandler = (
    err: CustomError,
    _: Request,
    res: Response,
    next: NextFunction /* eslint-disable-line @typescript-eslint/no-unused-vars */
) => {
    const statusCode = err.statusCode || 500;
    const error = err.error || 500;
    const errMsg = err.message || "Something went wrong";

    const errorData = {
        type: error,
        message: errMsg,
        ...(process.env.NODE_ENV === "development" && { stack: err.stack }),
    } as ErrorData;

    console.error(err.stack);
    return errorResponse({ res, statusCode, errorData });
};

export default errorHandler;
