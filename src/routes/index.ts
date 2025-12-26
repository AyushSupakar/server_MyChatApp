import { Router } from "express";
import AuthController from "../controllers/AuthController.js";
import authmiddlewear from "../middlewares/AuthMiddleWare.js";
import ChatGroupController from "../controllers/ChatGroupController.js";
import ChatGroupUserController from "../controllers/ChatGroupUserController.js";
import ChatsController from "../controllers/ChatsController.js";
const router = Router()

//Auth
router.post("/auth/login", AuthController.login)

//Chat Group
router.post("/chat-group", authmiddlewear, ChatGroupController.store);

router.get("/chat-group/:id", ChatGroupController.show);

router.get("/chat-group", authmiddlewear, ChatGroupController.index);

router.put("/chat-group/:id", authmiddlewear, ChatGroupController.update);

router.delete("/chat-group/:id", authmiddlewear, ChatGroupController.destroy);

// Chat Group Users

router.get("/chat-group-users",ChatGroupUserController.index);
router.post("/chat-group-users",ChatGroupUserController.store);

//Chats Messages
router.get("/chats/:groupId", ChatsController.index)

export default router