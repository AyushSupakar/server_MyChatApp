import { Request, Response } from "express";
import prisma from "../config/db.config.js";

class ChatGroupController {

  static async index(req: Request, res: Response) {
    try {
      const user = req.user;
      const groups = await prisma.chatGroroup.findMany({
        where: {
          user_id: user.id,
        },
        orderBy:{
            created_at:"desc"
        }
      });
      return res.json({ message: "Chat Groups fetched Successfully!", data:groups });
    } catch (error) {
      return res
        .status(500)
        .json({ message: "Something Went Wrong! Please Try Again..." });
    }
  }

  static async show(req: Request, res: Response) {
    try {
      
      const {id} = req.params;
      
      const mygroup = await prisma.chatGroroup.findUnique({
        where: {
          id:id
        }
      });
      
      return res.json({ message: "Chat Group fetched Successfully!", data:mygroup });
    } catch (error) {
      return res
        .status(500)
        .json({ message: "Something Went Wrong! Please Try Again..." });
    }
  }

  static async update(req: Request, res: Response) {
    try {
      const body = req.body;
      const {id} = req.params;
      await prisma.chatGroroup.update({
        data: {
          title: body.title,
          passcode: body.passcode,
        },
        where: {
          id:id
        }
      });
      return res.json({ message: "Chat Group Updated Successfully!" });
    } catch (error) {
      return res
        .status(500)
        .json({ message: "Something Went Wrong! Please Try Again..." });
    }
  }

  static async destroy(req: Request, res: Response) {
    try {
      
      const {id} = await req.params;
      
      const mygroup = await prisma.chatGroroup.delete({
        where: {
          id:id
        }
      });
      
      return res.json({ message: "Chat Group Deleted Successfully!" });
    } catch (error) {
      return res
        .status(500)
        .json({ message: "Something Went Wrong! Please Try Again..." });
    }
  }

  static async store(req: Request, res: Response) {
    try {
      const body = req.body;
      const user = req.user;
      await prisma.chatGroroup.create({
        data: {
          title: body.title,
          passcode: body.passcode,
          user_id: user.id,
        },
      });
      return res.json({ message: "Chat Group Created Successfully!" });
    } catch (error) {
      return res
        .status(500)
        .json({ message: "Something Went Wrong! Please Try Again..." });
    }
  }
}

export default ChatGroupController;
