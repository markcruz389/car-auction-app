import { Request, Response } from "express";
import { matchedData } from "express-validator";

import { addBid } from "../../models/bid/bid.model";
import { IRequestWithUserId } from "../../_common/types";
import { getAuctionById } from "../../models/auction/auction.model";
import { ERROR_TYPE, errorResponse } from "../../_utils/errorResponse";

const httpPostBid = async (req: Request, res: Response) => {
    const { userId } = req as IRequestWithUserId;
    const { auctionId } = matchedData(req);

    const auction = await getAuctionById(auctionId);
    if (!auction) {
        return errorResponse({
            res,
            statusCode: 404,
            errorData: {
                type: ERROR_TYPE.NOT_FOUND,
                message: "Auction not found",
            },
        });
    }

    const bid = await addBid({
        userId,
        auctionId,
        priceIncrement: auction.priceIncrement,
    });

    return res.status(201).json({ bid });
};

export { httpPostBid };
