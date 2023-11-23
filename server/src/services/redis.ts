import Redis from "ioredis";

const redisConfig = {
    host: process.env.REDIS_HOST as string,
    port: Number(process.env.REDIS_PORT),
};

const redisClient = new Redis(redisConfig);

export default redisClient;
