import { error } from "console";
import { Server, Socket } from "socket.io";
import prisma from "./config/db.config.js";
import { produceMessage } from "./helper.js";

interface customSocket extends Socket{
    room?:string;
}

export function setupSocket(io:Server){

    io.use((socket:customSocket, next)=>{
        const room = socket.handshake.auth.room || socket.handshake.headers.room;
        if(!room){
            return next(new Error("Please Pass Correct Room ID"))
            
        }
        socket.room=room;
        next();
    })

    io.on("connection", (socket:customSocket)=>{
        
        //join the room

        socket.join(socket.room);

        // console.log("The socket connected...", socket.id);

        socket.on("message", async (data)=>{
            console.log("server side message", data);

           await produceMessage(process.env.KAFKA_TOPIC||"", data);
            socket.to(socket.room).emit("message", data);
        })

        socket.on("disconnect", ()=>{
            console.log("A user diconnected", socket.id);
            
        })
    })
}