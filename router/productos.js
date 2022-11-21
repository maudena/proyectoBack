import "../config.js";
import { crearObj, routerDelete, getProd, prodDelete, prodPut } from "../controllers/productos.js";


import express from 'express';
const { Router } = express;
const routerProd = Router();



routerProd.get("/productos", getProd);
routerProd.post("/admin", crearObj);
routerProd.delete("/productos/:id", routerDelete);
routerProd.delete("/productos", prodDelete)
routerProd.put("/productos/:id", prodPut);

export default routerProd;
