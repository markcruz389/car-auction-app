import mongoose, { Document, ObjectId, Schema } from "mongoose";

interface IBid extends Document {
    auctionId: ObjectId;
    userId: ObjectId;
    amount: number;
    createdAt: Date;
    updatedAt: Date;
}

const schema = new Schema<IBid>(
    {
        auctionId: {
            type: Schema.Types.ObjectId,
            required: true,
        },
        userId: {
            type: Schema.Types.ObjectId,
            required: true,
        },
        amount: {
            type: Number,
            required: true,
        },
    },
    { versionKey: false, timestamps: true }
);

export default mongoose.model<IBid>("Bid", schema);
