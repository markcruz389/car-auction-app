import { ObjectId } from "mongoose";
import bids from "./bid.schema";
import { getAuctionById } from "../auction/auction.model";

type AddBidInput = {
    userId: string;
    auctionId: string;
};

type BidResult = {
    _id: ObjectId;
    userId: ObjectId;
    auctionId: ObjectId;
    amount: number;
    createdAt: Date;
    updatedAt: Date;
};

const getBidsByAuctionId = async (_id: string): Promise<Array<BidResult>> => {
    return await bids.find({ auctionId: _id });
};

const addBid = async (args: AddBidInput): Promise<BidResult | null> => {
    const auction = await getAuctionById(args.auctionId);
    if (!auction) {
        return null;
    }

    const auctionBids = await getBidsByAuctionId(args.auctionId);
    const amount =
        auctionBids.length === 0
            ? auction.priceIncrement
            : auction.priceIncrement * (auctionBids.length + 1);

    return await bids.create({ ...args, amount });
};

export { addBid };
