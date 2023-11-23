import { Request } from "express";

interface IRequestWithUserId extends Request {
    userId: string;
}

export { IRequestWithUserId };
