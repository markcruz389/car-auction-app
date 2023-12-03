import { Request, Response, NextFunction } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";

import { USER_ROLE } from "../_common/constants";
import { IRequestWithUserId } from "../_common/types";
import { ERROR_TYPE, errorResponse } from "../_utils/errorResponse";
import { constructToken } from "../_utils/authToken";

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

const getToken = (req: Request): string | null => {
    const payload = req.cookies.auth_data;
    const signatureAndHeader = req.signedCookies.auth;
    if (!payload || !signatureAndHeader) {
        return null;
    }

    return constructToken(payload, signatureAndHeader);
};

const decodeToken = (token: string): jwt.JwtPayload | null => {
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
    const token = getToken(req);
    if (!token) {
        return unauthenticated(res);
    }

    const decodedToken = decodeToken(token);
    if (!decodedToken) {
        return unauthenticated(res);
    }

    next();
};

const userAuthChecker = (req: Request, res: Response, next: NextFunction) => {
    const token = getToken(req);
    if (!token) {
        return unauthenticated(res);
    }

    const decodedToken = decodeToken(token);
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
    const token = getToken(req);
    if (!token) {
        return unauthenticated(res);
    }

    const decodedToken = decodeToken(token);
    if (!decodedToken) {
        return unauthenticated(res);
    }

    if (!decodedToken.roles.includes(USER_ROLE.ADMIN)) {
        return unauthenticated(res);
    }

    next();
};

export { isNotLoggedInChecker, userAuthChecker, adminAuthChecker };
