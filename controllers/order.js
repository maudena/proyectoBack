import dotenv from "dotenv"
dotenv.config()
import User from "../models/User.js";
import { Cart } from "../models/CartModel.js";
import { createTransport } from "nodemailer"

//----------------------------------------NODEMAILER CONFIG

const testMail = process.env.TEST_MAIL                       //-----Completar con email para probar funcionalidad
const testPass = process.env.TEST_PASS
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


export async function getOrder(req, res) {
    const datosUser = await User.findById(req.user._id).lean()
    const cart = new Cart(req.session.cart)
    const cartArr = cart.generateArray()
    res.render("order",{
        datos: datosUser,
        cart: cartArr,
        totalPrice: cart.totalPrice
    });
}

export async function sendOrder(req,res){
    const datosUser = await User.findById(req.user._id).lean()
    const cart = new Cart(req.session.cart)
    const cartArr = cart.generateArray()
    let titles = "";
    cartArr.forEach((item) => {
    titles += item.item.title + ", ";
  });
  
  //---------------MAIL DE NODEMAILER
  const emailContent = {
    from: "Test App Music",
    to: `Administrador ${testMail}`,
    subject: "Nueva Orden de compra",
    html: `El usuario ${datosUser.username} ha generado una nueva orden de compra.<br><br> Email: ${newUser.email} <br> Productos: ${titles} <br> Precio total: ${cart.totalPrice} <br>`,
  };
  try {
    await transporter.sendMail(emailContent);
  } catch (error) {
    console.log(error);
  }

  res.redirect("/home")

}