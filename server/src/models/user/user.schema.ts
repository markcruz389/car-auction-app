import mongoose, { Document, Schema } from "mongoose";

export type UserRole = "admin" | "user";

interface IUser extends Document {
    email: string;
    password: string;
    roles: UserRole[];
    fullName: string;
    phone: string;
}

const schema = new Schema<IUser>(
    {
        email: {
            type: String,
            required: true,
        },
        password: {
            type: String,
            required: true,
        },
        roles: {
            type: [String],
            required: true,
        },
        fullName: {
            type: String,
            required: true,
        },
        phone: {
            type: String,
            required: true,
        },
    },
    { versionKey: false }
);

export default mongoose.model<IUser>("User", schema);
