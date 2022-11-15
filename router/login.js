import express from "express";
import passport from "passport";
import User from "../models/User.js";
import bcrypt from "bcrypt"
import { createTransport } from "nodemailer"
const { Router } = express;
const routerLogin = Router();

const testMail = 'mdenardi32@gmail.com'
const testPass = 'byndkuiatajbaple'

const transporter = createTransport({
  service: "gmail",
  secure: false,
  port: 587,
  auth: {
      user: testMail,
      pass: testPass
  },
  tls: {
    rejectUnauthorized: false
}
});


routerLogin.get("/", (req, res) => {
  if (req.session.username) {
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

routerLogin.post("/login", passport.authenticate("local", {failureRedirect: "login-error"}),(req, res) => {
    res.redirect("/home");
  }
);

routerLogin.post("/register", async (req, res) => {
    const { email, password, name, address, age, phone} = req.body;
    User.findOne({ email }, async (err, user) => {
      if (err) console.log(err);
      if (user) res.render("register-error");
      if (!user) {
        const hashedPassword = await bcrypt.hash(password, 8);
        const newUser = new User({
          email,
          password: hashedPassword,
          name,
          address,
          age,
          phone
        });
        await newUser.save();
  
        const emailContent = {
          from: "Test App Guitarras",
          to: `Administrador ${testMail}`,
          subject: "Nuevo Registro",
          html: `El usuario ${newUser.name} se ha registrado correctamente.<br><br> Email: ${newUser.email} <br> Password: ${newUser.password} <br> Direccion: ${newUser.address} <br> Edad: ${newUser.age} <br> Telefono: ${newUser.phone} `
        }
        try {
          await transporter.sendMail(emailContent)
        } catch (error) {
          console.log(error);
        }
        res.redirect("/login");
      }
    });
  });
  



export default routerLogin;
