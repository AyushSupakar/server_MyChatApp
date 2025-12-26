import { Request, Response } from "express";
import prisma from "../config/db.config.js";

interface GroupUserType{
    name: string;
    group_id:string;
}

class ChatGroupUserController {
    static async index(req: Request, res:Response){
        try {
            const {group_id} = req.query;
            const users = await prisma.groupUsers.findMany({
                where:{
                    group_id:group_id as string
                }
            })

            return res.json({message:"data fetched successfully", data:users});

        } catch (error) {
            return res.status(500).json({message:"Something Went Wrong! Please try again."})
        }
    }

    static async store(req: Request, res:Response){
        try {
            const body:GroupUserType = req.body

            const user = await prisma.groupUsers.create({
                data:body
            })

            return res.json({message:"User Added successfully", data:user});

        } catch (error) {
            return res.status(500).json({message:"Something Went Wrong! Please try again."})
        }
    }
}
export default ChatGroupUserController