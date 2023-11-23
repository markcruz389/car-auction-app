import fs from "node:fs";
import path from "node:path";
import { parse } from "csv-parse";

import redisClient from "../../services/redis";

type CarType = {
    id: string;
    type: string;
};

const setCarTypes = async (): Promise<void> => {
    return new Promise<void>((resolve, reject) => {
        fs.createReadStream(
            path.join(__dirname, "..", "..", "_data/carTypes.csv")
        )
            .pipe(
                parse({
                    delimiter: ",",
                    columns: true,
                    comment: "#",
                    trim: true,
                })
            )
            .on("data", async (data: CarType) => {
                await redisClient.set(`type-${data.id}`, data.type);
            })
            .on("error", (error) => {
                reject(error);
            })
            .on("end", () => resolve());
    });
};

const getCarTypeByKey = async (key: string): Promise<string | null> => {
    return await redisClient.get(key);
};

export { setCarTypes, getCarTypeByKey };
