import { Redis } from "ioredis";
let redis: Redis;


redis = new Redis(process.env.REDIS_URL);


export default redis;


// import { Redis } from '@upstash/redis'

// const redis = new Redis({
//   url: process.env.REDIS_URL,
//   token: process.env.REDIS_TOKEN,
// })

// export default redis



// import { createClient } from "redis"

// const redisclient = createClient ({
//   url : process.env.REDIS_URL
// });

// redisclient.on("error", function(err) {
//   throw err;
// });
// await redisclient.connect()
// await redisclient.set('foo','bar');

// export default redisclient


// import {Redis} from "ioredis";

// const redis = new Redis({
//     host:"localhost",
//     port:6379
// });

// export default redis;