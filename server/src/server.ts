import http from "node:http";

import app from "./app";
import { mongoConnect } from "./services/mongo";
import { setCarTypes } from "./models/car-type/car-type.model";

const PORT = process.env.SERVER_PORT;

const startServer = async () => {
    await Promise.all([setCarTypes(), mongoConnect()]);

    const server = http.createServer(app);
    server.listen(PORT, () => console.log(`Listening to port ${PORT}...`));
};

startServer();
