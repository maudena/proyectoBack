import { productos as productosApi } from "../items.js";
import "../config.js";

export async function crearObj(req, res) {
  try {
   return await productosApi.guardar({
      title: req.title,
      price: req.price,
      stock: req.stock,
      // filename: req.body.filename,
      // path: "public/" + req.body.filename,
      // originalname: req.body.originalname,
    });
    res.send(req.body);
  } catch (error) {
    console.log(error);
  }
}

export async function getItem(req, res){
  const producto = await productosApi.listar(req.id)
  return producto;
}

export async function getProd() {
  const productos = await productosApi.listarAll();
  return productos;
}

export async function routerDelete(req, res) {
  const admin = true;
  if (admin == true) {
    return await productosApi.delete(req.id);
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
    return await productosApi.actualizar(req.body);
}
