import { Cart } from "../models/CartModel.js";
import { productos } from "../items.js";


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
    res.render("cart", {
      carrito: carritoArr,
      totalPrice: carrito.totalPrice,
    });
  }
}

export async function deleteItem(req,res){
  const productId = req.params.id
  const carrito = new Cart(req.session.cart)
  carrito.removeOne(productId)
  req.session.cart = carrito
  res.redirect("/carrito")
}

export async function deleteAll(req,res){
  const productId = req.params.id
  const carrito = new Cart(req.session.cart)
  carrito.removeAll(productId)
  req.session.cart = carrito
  res.redirect("/carrito")
}
