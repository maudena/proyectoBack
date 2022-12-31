import "../config.js";
import {getItem, crearObj, routerDelete, getProd, prodDelete, prodPut, getInstrumentos, getAmplis, getAccesorios } from "../controllers/productos.js";


import express from 'express';
const { Router } = express;
const routerProd = Router();



routerProd.get("/productos", getProd);
routerProd.post("/admin", crearObj);
routerProd.delete("/productos/:id", routerDelete);
routerProd.delete("/productos", prodDelete)
routerProd.get("/productos/:id", getItem)
routerProd.put("/productos/:id", prodPut);

//-------RUTAS DE CATEGORIAS

routerProd.get("/categories/instrumentos", getInstrumentos)
routerProd.get("/categories/amplificadores", getAmplis)
routerProd.get("/categories/accesorios", getAccesorios)


export default routerProd;
