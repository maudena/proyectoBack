import express from 'express';
import {getChat} from "../controllers/chat.js"
const { Router } = express;
const routerChat = Router();


routerChat.get("/chat", getChat)

export default routerChat