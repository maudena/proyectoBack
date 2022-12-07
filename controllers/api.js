import { productos as productosApi } from "../items.js";
import "../config.js";

export async function crearObj(req, res) {
  try {
   await productosApi.guardar({
      title: req.body.title,
      price: req.body.price,
      stock: req.body.stock,
      filename: req.body.filename,
      path: "public/" + req.body.filename,
      originalname: req.body.originalname,
    });
    res.send(req.body);
  } catch (error) {
    console.log(error);
  }
}

export async function getItem(req, res){
  const producto = await productosApi.listar(req.id)
  res.send(producto);
}

export async function getProd(req, res) {
  const productos = await productosApi.listarAll();
  res.send(productos);
}

export async function routerDelete(req, res) {
  const admin = true;
  if (admin == true) {
    res.send(await productosApi.delete(req.params.id)) 
  } else {
    throw new Error("Ruta no autorizada");
  }
}

export async function prodDelete(req, res) {
  const admin = true;
  if (admin == true) {
    res.json(await productosApi.deleteAll());
  } else {
    throw new Error("Ruta no autorizada");
  }
}

export async function prodPut(req, res) {
    res.send(await productosApi.actualizar(req.body));
}
