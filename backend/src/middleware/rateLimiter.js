import rateLimit from "../config/upstash.js";

const rateLimiter = async (req, res, next) => {
    try{
        const key = req.ip; //user ip retrieved from express
        const {success} = await rateLimit.limit(key);

        if(!success){
            return res.status(429).json({error:"Too many requests"});
        }
        next();
    }
    catch(err){
        console.log("Rate limit error", err);
        next(err);
    }
}

export default rateLimiter;