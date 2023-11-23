import mongoose, { Document, Schema } from "mongoose";

interface IAuction extends Document {
    carBrand: string;
    carYear: number;
    carType: string;
    openingPrice: number;
    priceIncrement: number;
    expiryDate: Date;
}

const schema = new Schema<IAuction>({
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
});

export default mongoose.model<IAuction>("Auction", schema);
