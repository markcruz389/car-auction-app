import { Request, Response, NextFunction } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";

import { USER_ROLE } from "../_common/constants";
import { IRequestWithUserId } from "../_common/types";
import { ERROR_TYPE, errorResponse } from "../_utils/errorResponse";

const unauthenticated = (res: Response) => {
    return errorResponse({
        res,
        statusCode: 401,
        errorData: {
            type: ERROR_TYPE.UNAUTHORIZED,
            message: "User is not authenticated",
        },
    });
};

const decodeToken = (bearerToken: string | undefined) => {
    if (!bearerToken) {
        return null;
    }

    const token = bearerToken.replace("/^Bearer/", "");
    if (!token) {
        return null;
    }

    try {
        return jwt.verify(
            token,
            process.env.JWT_SECRET as string
        ) as JwtPayload;
    } catch (error) {
        return null;
    }
};

const isNotLoggedInChecker = (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    const decodedToken = decodeToken(req.headers.authorization);
    if (!decodedToken) {
        return unauthenticated(res);
    }

    next();
};

const userAuthChecker = (req: Request, res: Response, next: NextFunction) => {
    const decodedToken = decodeToken(req.headers.authorization);
    if (!decodedToken) {
        return unauthenticated(res);
    }

    if (!decodedToken.roles.includes(USER_ROLE.USER)) {
        return unauthenticated(res);
    }

    (req as IRequestWithUserId).userId = decodedToken._id;
    next();
};

const adminAuthChecker = (req: Request, res: Response, next: NextFunction) => {
    const decodedToken = decodeToken(req.headers.authorization);
    if (!decodedToken) {
        return unauthenticated(res);
    }

    if (!decodedToken.roles.includes(USER_ROLE.ADMIN)) {
        return unauthenticated(res);
    }

    next();
};

export { isNotLoggedInChecker, userAuthChecker, adminAuthChecker };
