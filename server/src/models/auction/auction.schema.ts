import mongoose, { Document, ObjectId, Schema } from "mongoose";
import { AUCTION_STATUS } from "../../_common/constants";

export type AuctionStatus = "open" | "closed";

interface IAuction extends Document {
    userId: ObjectId;
    carBrand: string;
    carYear: number;
    carType: string;
    openingPrice: number;
    priceIncrement: number;
    expiryDate: Date;
    status: AuctionStatus;
    isDeleted: boolean;
}

const schema = new Schema<IAuction>(
    {
        userId: {
            type: Schema.Types.ObjectId,
            required: true,
        },
        carBrand: {
            type: String,
            required: true,
        },
        carYear: {
            type: Number,
            required: true,
        },
        carType: {
            type: String,
            required: true,
        },
        openingPrice: {
            type: Number,
            required: true,
        },
        priceIncrement: {
            type: Number,
            required: true,
        },
        expiryDate: {
            type: Date,
            required: true,
        },
        status: {
            type: String,
            required: true,
            default: AUCTION_STATUS.CLOSED,
        },
        isDeleted: {
            type: Boolean,
            required: true,
            default: false,
        },
    },
    { versionKey: false, timestamps: true }
);

export default mongoose.model<IAuction>("Auction", schema);
