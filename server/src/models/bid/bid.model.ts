import { ObjectId } from "mongoose";
import bids from "./bid.schema";

type AddBidInput = {
    userId: string;
    auctionId: string;
    priceIncrement: number;
};

type BidResult = {
    _id: ObjectId;
    userId: ObjectId;
    auctionId: ObjectId;
    amount: number;
    createdAt: Date;
    updatedAt: Date;
};

const addBid = async (args: AddBidInput): Promise<BidResult | null> => {
    const bidsCount = await bids.countDocuments({ auctionId: args.auctionId });

    const amount =
        bidsCount === 0
            ? args.priceIncrement
            : args.priceIncrement * (bidsCount + 1);

    return await bids.create({
        auctionId: args.auctionId,
        userId: args.userId,
        amount,
    });
};

export { addBid };
