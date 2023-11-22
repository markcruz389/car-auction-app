import http from "node:http";

import app from "./app";
import { mongoConnect } from "./services/mongo";

const PORT = process.env.SERVER_PORT;

const startServer = async () => {
    await mongoConnect();

    const server = http.createServer(app);
    server.listen(PORT, () => console.log(`Listening to port ${PORT}...`));
};

startServer();
