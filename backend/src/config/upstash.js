import {Ratelimit} from "@upstash/ratelimit";
import {Redis} from "@upstash/redis";
import dotenv from "dotenv";

dotenv.config();

//5 requests per 10 sec
const rateLimit = new Ratelimit({
    redis: Redis.fromEnv(),
    limiter: Ratelimit.slidingWindow(10, '10 s')
})

export default rateLimit;