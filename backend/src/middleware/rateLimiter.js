import rateLimit from "../config/upstash.js";

const rateLimiter = async (req, res, next) => {
    try{
        // TODO replace ip with auth
        const key = req.ip;
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