import express from 'express';
import {addToCart, renderCart, sendCart} from "../controllers/cart.js"
import "../config.js";
const { Router } = express;
const routerCart = Router();

routerCart.get("/carrito", renderCart );
routerCart.get("/carrito/:id",addToCart);
routerCart.post("/carrito", sendCart)


export default routerCart;
