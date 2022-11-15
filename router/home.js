import express from "express";
import { auth } from "../middlewares/auth.js";
import { productos as productosApi } from "../items.js";
import User from "../models/User.js";
const { Router } = express;
const routerHome = Router();

routerHome.get("/home", auth, async (req, res) => {
  const productos = await productosApi.listarAll();
  const datosUsuario = await User.findById(req.user._id).lean();

  res.render("home", {
    productos: productos,
    datos: datosUsuario,
  });
});

routerHome.get("/profile", async (req, res) => {
  const datosUsuario = await User.findById(req.user._id).lean();
  res.render("profile", {
    datos: datosUsuario,
  });
});

routerHome.get("/logout", (req, res) => {
  req.logout(function (err) {
    if (err) {
      return next(err);
    }
    res.redirect("/");
  });
});
export default routerHome;
