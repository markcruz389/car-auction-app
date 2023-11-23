import { Request, Response } from "express";

import { createAuction } from "../../models/auction/auction.model";
import { matchedData } from "express-validator";

const httpPostCreateAuction = async (req: Request, res: Response) => {
    const {
        carBrand,
        carYear,
        carType,
        openingPrice,
        priceIncrement,
        expiryDate,
    } = matchedData(req);

    console.log(carType);

    const auction = await createAuction({
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
