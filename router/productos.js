import { productos as productosApi } from "../items.js"
import "../config.js";

import express from 'express';
const { Router } = express;
const routerProd = Router();



routerProd.get("/productos", async (req, res) => {
  const productos = await productosApi.listarAll()
  res.render("productos",{
    productos
  });
});

routerProd.get("/productos/:id", async (req, res) => {
  res.json(await productosApi.listar(req.params.id));
});


routerProd.post("/admin", async (req, res) => {
  try {
    await productosApi.guardar(req.body)
    res.redirect("/admin")
  } catch (error) {
    console.log(error);
  }
});

routerProd.delete("/productos/:id", async (req, res) => {
  const admin = true;
  if (admin == true) {
    res.json(await productosApi.delete(req.params.id))
  } else {
    throw new Error("Ruta no autorizada");
  }
});

routerProd.delete("/productos", async(req, res) =>{
  const admin = true
  if(admin == true){
    res.json(await productosApi.deleteAll())
  } else {
    throw new Error("Ruta no autorizada");
  }
})

routerProd.put("/productos/:id", async (req, res) => {
  const admin = true;

  if (admin == true) {
    res.json(await productosApi.actualizar(req.body))
  } else {
    throw new Error("Ruta no autorizada");
  }
});

export default routerProd;
