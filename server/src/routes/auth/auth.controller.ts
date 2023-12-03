import { Request, Response } from "express";
import { matchedData } from "express-validator";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

import { getUserByEmail, createUser } from "../../models/user/user.model";
import { ERROR_TYPE, errorResponse } from "../../_utils/errorResponse";
import { splitToken } from "../../_utils/authToken";

const failedLogin = (res: Response) => {
    return errorResponse({
        res,
        statusCode: 401,
        errorData: {
            type: ERROR_TYPE.UNAUTHORIZED,
            message: "Invalid username or password",
        },
    });
};

const httpGetLogout = (_: Request, res: Response) => {
    return res.status(200).json({ message: "Logged out successfully" });
};

const httpPostRegister = async (req: Request, res: Response) => {
    const { email, password, fullName, phone } = matchedData(req);

    const existingUser = await getUserByEmail(email);
    if (existingUser) {
        return errorResponse({
            res,
            statusCode: 409,
            errorData: {
                type: ERROR_TYPE.CONFLICT,
                message: "Email already exists",
            },
        });
    }

    const user = await createUser({
        email,
        password,
        fullName,
        phone,
    });

    return res.status(201).json(user);
};

const httpPostLogin = async (req: Request, res: Response) => {
    const { email, password } = matchedData(req);

    const user = await getUserByEmail(email);
    if (!user) {
        return failedLogin(res);
    }

    const isUserAuth = await bcrypt.compare(password, user.password);
    if (!isUserAuth) {
        return failedLogin(res);
    }

    const token = jwt.sign(
        { _id: user._id, roles: user.roles },
        process.env.JWT_SECRET as string,
        { expiresIn: process.env.JWT_EXPIRES_IN }
    );
    const { payload, signatureAndHeader } = splitToken(token);

    res.cookie("auth", signatureAndHeader, {
        signed: true,
        secure: false, // TODO set to true if not testing
        httpOnly: true,
        sameSite: "strict",
    });
    res.cookie("auth_data", payload, {
        signed: false,
        secure: false,
        httpOnly: false,
        sameSite: "strict",
    });
    return res.status(200).json({ data: { token } });
};

export { httpGetLogout, httpPostRegister, httpPostLogin };
