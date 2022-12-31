import express from 'express';
import {addToCart, renderCart, deleteItem, deleteAll} from "../controllers/cart.js"
import "../config.js";
const { Router } = express;
const routerCart = Router();

routerCart.get("/carrito", renderCart );
routerCart.get("/carrito/:id",addToCart);
routerCart.get("/carrito/delete/:id", deleteItem)
routerCart.get("/carrito/deleteAll/:id", deleteAll)


export default routerCart;
