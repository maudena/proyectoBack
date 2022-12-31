//------------------ ARCHIVO USADO PARA TESTING Y POSTMAN

import express  from "express";
import "../config.js";
import {getProd, routerDelete, prodDelete, prodPut, crearObj, getItem} from "../controllers/api.js"
const { Router } = express;
const routerApi = Router();

routerApi.post("/productos", crearObj);
routerApi.get("/productos", getProd)
routerApi.get("/productos/:id", getItem)
routerApi.delete("/productos/:id", routerDelete);
routerApi.delete("/productos", prodDelete)
routerApi.put("/productos/:id", prodPut);


export default routerApi;