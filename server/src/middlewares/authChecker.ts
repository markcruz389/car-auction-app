import { Request, Response, NextFunction } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";

import { USER_ROLE } from "../_common/constants";
import { IRequestWithUserId } from "../_common/types";

const unauthorized = (res: Response) => {
    return res.status(401).json({ message: "Unauthorized" });
};

const decodeToken = (token: string | undefined) => {
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

const isLoggedInChecker = (req: Request, res: Response, next: NextFunction) => {
    const decodedToken = decodeToken(req.cookies.access_token);
    if (decodedToken) {
        return res.status(400).json({ message: "Already logged in" });
    }

    next();
};

const isNotLoggedInChecker = (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    const decodedToken = decodeToken(req.cookies.access_token);
    if (!decodedToken) {
        return unauthorized(res);
    }

    next();
};

const userAuthChecker = (req: Request, res: Response, next: NextFunction) => {
    const decodedToken = decodeToken(req.cookies.access_token);
    if (!decodedToken) {
        return unauthorized(res);
    }

    if (!decodedToken.roles.includes(USER_ROLE.USER)) {
        return unauthorized(res);
    }

    (req as IRequestWithUserId).userId = decodedToken._id;
    next();
};

const adminAuthChecker = (req: Request, res: Response, next: NextFunction) => {
    const decodedToken = decodeToken(req.cookies.access_token);
    if (!decodedToken) {
        return unauthorized(res);
    }

    if (!decodedToken.roles.includes(USER_ROLE.ADMIN)) {
        return unauthorized(res);
    }

    next();
};

export {
    isLoggedInChecker,
    isNotLoggedInChecker,
    userAuthChecker,
    adminAuthChecker,
};
