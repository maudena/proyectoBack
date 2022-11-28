import ContenedorMongoDB from "../dao/ContenedorMongoDB.js";


class ProdMongoDB extends ContenedorMongoDB {
  constructor() {
    super("productos", {
      title: { type: String, required: true },
      price: { type: Number, required: true },
      stock: { type: Number, required: true },
      filename: { type: String, required: false },
      path:{ type: String, required: false },
      originalname: { type: String, required: false},
      inCart: {type: Boolean, default: false}
    });
  }
}

export default ProdMongoDB;
