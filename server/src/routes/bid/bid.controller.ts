import { Request, Response } from "express";
import { matchedData } from "express-validator";
import { addBid } from "../../models/bid/bid.model";
import { IRequestWithUserId } from "../../_common/types";

const httpPostBid = async (req: Request, res: Response) => {
    const { userId } = req as IRequestWithUserId;
    const { auctionId } = matchedData(req);

    const bid = await addBid({ auctionId, userId });
    if (!bid) {
        return res.status(400).json({ message: "Failed to create bid" });
    }

    return res.status(201).json({ bid });
};

export { httpPostBid };
