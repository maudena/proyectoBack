import { Cart } from "../models/CartModel.js";
import { productos } from "../items.js";
import twilio from "twilio";

const accountSID = "AC0f540496cfbe782e1a4c51232f3cfd27";
const authToken = "ff9f01ebd732632493597df996f5780a";
const client = twilio(accountSID, authToken);

export async function addToCart(req, res) {
  let productId = req.params.id;
  let carrito = new Cart(req.session.cart ? req.session.cart : {});

  productos.coleccion.findById(productId, function (err, product) {
    if (err) {
      console.log(err);
    }
    carrito.add(product, product.id);
    req.session.cart = carrito;
    res.redirect("/home");
  });
}

export async function renderCart(req, res) {
  if (!req.session.cart) {
    res.render("cart", {
      productos: null,
    });
  } else {
    let carrito = new Cart(req.session.cart);
    let carritoArr = carrito.generateArray();

    // const result = carritoArr.map(item =>{return item.item.title})


    res.render("cart", {
      carrito: carritoArr,
      totalPrice: carrito.totalPrice,
    });
  }
}

export async function sendCart(req, res) {
  
  try {
    let carrito = new Cart(req.session.cart);
    let carritoArr = carrito.generateArray();
    let titles = "";
    carritoArr.forEach((item) => {
      titles += item.item.title + ", ";
    });
    const message = await client.messages.create({
      body: `Nuevo pedido de ${req.user.username}, email: ${req.user.email}.
      Productos: ${titles}
      Precio total ${carrito.totalPrice}`,
      from: "+19148956088",
      to: "+542226447352",
    });
    console.log(message);
  } catch (error) {
    console.log(error);
  }
}
