import { json } from "express";
import express from 'express';
import { productos as productosApi } from "../items.js"
import {carritos as carritosApi} from "../items.js"
import "../config.js";
const { Router } = express;
const routerCart = Router();




routerCart.get("/carrito", async (req, res) => {
  const carrito = carritosApi.listarAll();
  res.render("cart",{
    carrito: carrito
  })
});

routerCart.get("/carrito/:id/productos", async (req, res) => {
  const carrito = await carritosApi.listar(req.params.id)
  res.json(carrito)
});

routerCart.post("/home", async (req, res) => {
  await carritosApi.guardar()
  res.redirect("/home")
});

routerCart.delete("/carrito/:id", async (req, res) => {
  res.json(await carritosApi.delete(req.params.id))
});

routerCart.delete("/carrito", async (req, res) => {
  const admin = true
  if(admin == true){
    res.json(await carritosApi.deleteAll())
  } else {
    throw new Error("Ruta no autorizada");
  }
});

routerCart.delete("/carrito/:id/productos/:id_prod", async (req, res) => {
  const carrito = await carritosApi.listar(req.params.id)
  const index = carrito.productos.findIndex(p => p.id == req.params.id_prod)
  const indexMongo = carrito.productos.findIndex(p => p._id == req.params.id_prod)
  console.log(index);
  if(index != -1){
    carrito.productos.splice(index, 1)
    await carritosApi.actualizar(carrito)
  }
  else if(indexMongo != -1){
    carrito.productos.splice(index, 1)
    await carritosApi.actualizar(carrito)
  }
  res.end();
});

routerCart.post("/carrito/:id/productos/:id_prod", async (req, res) => {
  const carrito = await carritosApi.listar(req.params.id)
  const producto = await productosApi.listar(req.params.id_prod)

  carrito.productos.push(producto)
  await carritosApi.actualizar(carrito)
  res.json(carrito);
});

export default routerCart;
