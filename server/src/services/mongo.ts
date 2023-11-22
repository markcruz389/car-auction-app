import mongoose from "mongoose";

const {
    MONGODB_USER,
    MONGODB_PASSWORD,
    MONGODB_DATABASE,
    MONGODB_HOST,
    MONGO_PORT,
} = process.env;
const MONGO_URL = `mongodb://${MONGODB_USER}:${MONGODB_PASSWORD}@${MONGODB_HOST}:${MONGO_PORT}/${MONGODB_DATABASE}?authSource=admin`;

mongoose.connection.once("open", () =>
    console.log(`MongoDB connection ready... ${MONGO_URL}`)
);

mongoose.connection.on("error", (err) =>
    console.log(`MongoDB disconnection = ${err}`)
);

const mongoConnect = async () => {
    await mongoose.connect(MONGO_URL);
};
const mongoDisconnect = async () => await mongoose.disconnect();

export { mongoConnect, mongoDisconnect };
