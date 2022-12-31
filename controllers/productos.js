import { productos as productosApi } from "../items.js"
import "../config.js";

export async function crearObj(req, res) {
    try {
      await productosApi.guardar({
        title: req.body.title,
        price: req.body.price,
        stock: req.body.stock,
        filename: req.file.filename,
        path: "public/" + req.file.filename,
        originalname: req.file.originalname,
        category: req.body.category
      })
      res.redirect("/admin")
    } catch (error) {
      console.log(error);
    }
}

export async function routerDelete(req, res){
  const admin = true;
  if (admin == true) {
    res.json(await productosApi.delete(req.params.id))
  } else {
    throw new Error("Ruta no autorizada");
  }
}

export async function getProd(req, res){
  const productos = await productosApi.listarAll()
  res.render("productos",{
    productos
  });
}

export async function getItem(req, res){
  const item = await productosApi.listar(req.params.id)
  res.render("item", item);
}

export async function prodDelete(req, res){
  const admin = true
  if(admin == true){
    res.json(await productosApi.deleteAll())
  } else {
    throw new Error("Ruta no autorizada");
  }
}

export async function prodPut(req, res){
  const admin = true;

  if (admin == true) {
    res.json(await productosApi.actualizar(req.body))
  } else {
    throw new Error("Ruta no autorizada");
  }
}


//--------GET CATEGORIAS

export async function getInstrumentos(req, res){
      const productos = await productosApi.listarAll()
      const instrumentos = productos.filter(e => e.category == "instrumentos")
      res.render("productos",{
        productos: instrumentos
      })
}

export async function getAmplis(req, res){
  const productos = await productosApi.listarAll()
  const amplificadores = productos.filter(e => e.category == "amplificadores")
  res.render("productos",{
    productos: amplificadores
  })
}

export async function getAccesorios(req, res){
  const productos = await productosApi.listarAll()
  const accesorios = productos.filter(e => e.category == "accesorios")
  res.render("productos",{
    productos: accesorios
  })
}