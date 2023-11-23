import { Request, Response } from "express";

import { createAuction } from "../../models/auction/auction.model";
import { matchedData } from "express-validator";
import { IRequestWithUserId } from "../../_common/types";

const httpPostCreateAuction = async (req: Request, res: Response) => {
    const { userId } = req as IRequestWithUserId;
    const {
        carBrand,
        carYear,
        carType,
        openingPrice,
        priceIncrement,
        expiryDate,
    } = matchedData(req);

    const auction = await createAuction({
        userId,
        carBrand,
        carYear,
        carType,
        openingPrice,
        priceIncrement,
        expiryDate,
    });
    if (!auction) {
        return res
            .status(400)
            .json({ message: "Failed creating auction listing" });
    }

    return res.status(201).json({ auction });
};

export { httpPostCreateAuction };
