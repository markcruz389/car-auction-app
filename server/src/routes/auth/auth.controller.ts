import { Request, Response } from "express";
import { matchedData } from "express-validator";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

import { getUserByEmail, createUser } from "../../models/user/user.model";
import { ERROR_TYPE, errorResponse } from "../../_utils/errorResponse";

const failedLogin = (res: Response) => {
    return res.status(401).json({ message: "Invalid username or password" });
};

const httpGetLogout = (_: Request, res: Response) => {
    res.clearCookie("access_token");
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
                error: ERROR_TYPE.CONFLICT,
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
        process.env.JWT_SECRET as string
    );
    return res
        .cookie("access_token", token, { httpOnly: true })
        .status(200)
        .json({ message: "Logged in successfully" });
};

export { httpGetLogout, httpPostRegister, httpPostLogin };
