import express from 'express';
import "../config.js";
import { getOrder, sendOrder} from "../controllers/order.js"
const { Router } = express;
const routerOrder = Router();


routerOrder.get("/order", getOrder)
routerOrder.get("/order/send", sendOrder)


export default routerOrder