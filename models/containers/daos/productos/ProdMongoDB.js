import ContenedorMongoDB from "../../ContenedorMongoDB.js";


class ProdMongoDB extends ContenedorMongoDB {
  constructor() {
    super("productos", {
      title: { type: String, required: true },
      price: { type: Number, required: true },
      stock: { type: Number, required: true },
      filename: { type: String },
      path:{ type: String },
      originalname: { type: String},
      inCart: {type: Boolean, default: false}
    });
  }
}

export default ProdMongoDB;
