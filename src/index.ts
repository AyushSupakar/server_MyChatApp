import express, { Application, Request, Response } from "express";
import "dotenv/config";
import cors from "cors";
import Routes from "./routes/index.js"
import { Server } from "socket.io";
import { createServer } from "http";
import { setupSocket } from "./socket.js";
import { createAdapter } from "@socket.io/redis-streams-adapter";
import redis from "./config/redis.config.js";
import { instrument } from "@socket.io/admin-ui";
import { connectKafkaProducer } from "./config/kafka.config.js";

export const app: Application = express(); // Added export
const PORT = process.env.PORT || 7000;

const server = createServer(app);
const io = new Server(server, {
  cors:{
    origin: ["http://localhost:3000","https://admin.socket.io"],
    credentials:true
  },
  adapter: createAdapter(redis),
});

instrument(io, {
  auth: false,
  mode: "development",
});

setupSocket(io);
export {io};

// * Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.get("/", (req: Request, res: Response) => {
  return res.send("It's working 🙌");
});

app.use("/api", Routes)

// Only connect Kafka producer and listen if running locally
if (process.env.NODE_ENV !== "production") {
    connectKafkaProducer().catch((err) =>
      console.error("Error connecting Kafka producer:", err)
    );
    
    server.listen(PORT, () => console.log(`Server is running on PORT ${PORT}`));
}



//AWS Update
// import express, { Application, Request, Response } from "express";
// import "dotenv/config";
// import cors from "cors";
// const app: Application = express();
// const PORT = process.env.PORT || 7000;
// import Routes from "./routes/index.js"
// import { Server } from "socket.io";
// import { createServer } from "http";
// import { setupSocket } from "./socket.js";
// import { createAdapter } from "@socket.io/redis-streams-adapter";
// import redis from "./config/redis.config.js";
// import { instrument } from "@socket.io/admin-ui";
// import { connectKafkaProducer } from "./config/kafka.config.js";
// import { consumeMessages } from "./helper.js";
// // const { instrument } = require("@socket.io/admin-ui");


// const server = createServer(app);
// const io = new Server(server, {
//   cors:{
//     origin: ["http://localhost:3000","https://admin.socket.io"],
//     credentials:true
//   },
//   adapter: createAdapter(redis),
// });

// instrument(io, {
//   auth: false,
//   mode: "development",
// });


// setupSocket(io);
// export {io};

// // const io2 = new Server(server2,{
// //   cors:{
// //     origin:"*"
// //   },
// //   adapter:createAdapter(redis)
// // });

// // setupSocket(io2);
// // export {io2};

// // * Middleware
// app.use(cors());
// app.use(express.json());
// app.use(express.urlencoded({ extended: false }));

// app.get("/", (req: Request, res: Response) => {
//   return res.send("It's working 🙌");
// });

// app.use("/api", Routes)

// connectKafkaProducer().catch((err) =>
//   console.error("Error connecting Kafka producer:", err)
// );

// consumeMessages(process.env.KAFKA_TOPIC).catch((err) =>
//   console.error("Error consuming messages:", err)
// );

// server.listen(PORT, () => console.log(`Server is running on PORT ${PORT}`));
// // server2.listen(8002, () => console.log(`Server is running on PORT 8002`));