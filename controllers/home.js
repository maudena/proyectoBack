import { productos as productosApi } from "../items.js";
import User from "../models/User.js";

export async function getHome(req, res){
    const productos = await productosApi.listarAll();
    const datosUsuario = await User.findById(req.user._id).lean();
  
    res.render("home", {
      productos: productos,
      datos: datosUsuario,
    });
}

export async function getProfile(req, res){
    const datosUsuario = await User.findById(req.user._id).lean();
    res.render("profile", {
      datos: datosUsuario,
    });
}

export function getLogout (req, res){
    req.logout(function (err) {
      if (err) {
        return next(err);
      }
      res.redirect("/");
    });
  }
