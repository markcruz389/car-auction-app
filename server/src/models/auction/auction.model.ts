import auctions, { AuctionStatus } from "./auction.schema";
import { AUCTION_STATUS } from "../../_common/constants";
import { getCarTypeByKey } from "../car-type/car-type.model";
import { ObjectId } from "mongoose";

type AuctionResult = {
    _id: ObjectId;
    userId: string;
    carBrand: string;
    carYear: number;
    carType: string;
    openingPrice: number;
    priceIncrement: number;
    expiryDate: Date;
    status: AuctionStatus;
    isDeleted: boolean;
    createdAt: Date;
    updatedAt: Date;
};

type CreateAuctionInput = {
    userId: string;
    carBrand: string;
    carYear: number;
    carType: string;
    openingPrice: number;
    priceIncrement: number;
    expiryDate: Date;
};

const getAuctionById = async (_id: string): Promise<AuctionResult | null> => {
    return await auctions.findById(_id);
};

const createAuction = async (
    args: CreateAuctionInput
): Promise<AuctionResult> => {
    const carType = (await getCarTypeByKey(args.carType)) as string;
    const data = {
        ...args,
        carType,
        status: AUCTION_STATUS.CLOSED,
        isDeleted: false,
    };

    const doc = await auctions.create(data);

    return {
        ...data,
        _id: doc._id,
        createdAt: doc.createdAt,
        updatedAt: doc.updatedAt,
    };
};

export { getAuctionById, createAuction };
