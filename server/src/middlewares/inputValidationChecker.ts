import { Request, Response, NextFunction } from "express";
import { validationResult } from "express-validator";
import { errorResponse, ERROR_TYPE } from "../_utils/errorResponse";

const inputValidationChecker = (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        const statusCode = 404;
        const errorData = {
            type: ERROR_TYPE.BAD_REQUEST,
            message: "Invalid input",
            errors: errors.array(),
        };

        return errorResponse({ res, statusCode, errorData });
    }

    return next();
};

export default inputValidationChecker;
