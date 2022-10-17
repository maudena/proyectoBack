import ProdMongoDB from "./models/containers/daos/productos/ProdMongoDB.js"
import CartMongoDB from "./models/containers/daos/carritos/CartMongoDB.js"

let productos = new ProdMongoDB;
let carritos = new CartMongoDB;

export {productos, carritos} ;
