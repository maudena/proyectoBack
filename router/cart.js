import express from 'express';
import {addToCart, renderCart} from "../controllers/cart.js"
import "../config.js";
const { Router } = express;
const routerCart = Router();

routerCart.get("/carrito", renderCart )
routerCart.get("/carrito/:id",addToCart);


export default routerCart;
