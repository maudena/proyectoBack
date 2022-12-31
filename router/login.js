import express from "express";
import passport from "passport";
import { postRegister } from "../controllers/user.js";
const { Router } = express;
const routerLogin = Router();

routerLogin.get("/", (req, res) => {
  if (req.session.email) {
    res.redirect("/home");
  } else {
    res.redirect("/login");
  }
});

routerLogin.get("/login", (req, res) => {
  res.render("login");
});

routerLogin.get("/login-error", (req, res) => {
  res.render("login-error");
});

routerLogin.get("/register", (req, res) => {
    res.render("register");
  });

routerLogin.post("/login", passport.authenticate("local", {failureRedirect: "login-error"}), (req, res) => {
   res.redirect("/home")
  }
);

routerLogin.post("/register", postRegister);
  
export default routerLogin;
