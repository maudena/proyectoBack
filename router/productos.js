import { productos as productosApi } from "../items.js"
import "../config.js";
import pino from "pino"
import express from 'express';
const { Router } = express;
const routerProd = Router();

const logger = pino()
logger.level = "info"
const errorLog = pino("error.log")


routerProd.get("/productos", async (req, res) => {
  let {url, method} = req
  logger.info("Peticion recibida a %s metodo %s",url, method)
  

  const productos = await productosApi.listarAll()

  errorLog.error("Error en ruta %s %s",url,method)
  res.json(productos);
});

routerProd.get("/productos/:id", async (req, res) => {
  let {url, method} = req
  logger.info("Peticion recibida a %s metodo %s",url, method)
  

  errorLog.error("Error en ruta %s %s",url,method)
  res.json(await productosApi.listar(req.params.id));
});


routerProd.post("/home", async (req, res) => {
  let {url, method} = req
  logger.info("Peticion recibida a %s metodo %s",url, method)
  

  try {
    await productosApi.guardar(req.body)
    res.redirect("/home")
  } catch (error) {
    errorLog.error("Error en ruta %s %s, detalles: %s",url,method,error);
  }
});

routerProd.delete("/productos/:id", async (req, res) => {
  let {url, method} = req
  logger.info("Peticion recibida a %s metodo %s",url, method)
  

  const admin = true;
  if (admin == true) {
    res.json(await productosApi.delete(req.params.id))
  } else {
    errorLog.error("Error en ruta %s %s, detalles: %s",url,method);
  }
});

routerProd.delete("/productos", async(req, res) =>{
  let {url, method} = req
  logger.info("Peticion recibida a %s metodo %s",url, method)


  const admin = true
  if(admin == true){
    res.json(await productosApi.deleteAll())
  } else {
    errorLog.error("Error en ruta %s %s, detalles: %s",url,method);
  }
})

routerProd.put("/productos/:id", async (req, res) => {
  let {url, method} = req
  logger.info("Peticion recibida a %s metodo %s",url, method)

  const admin = true;

  if (admin == true) {
    res.json(await productosApi.actualizar(req.body))
  } else {
    errorLog.error("Error en ruta %s %s, detalles: %s",url,method);
  }
});

export default routerProd;
