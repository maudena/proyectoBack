import ContenedorMongoDB from "../../ContenedorMongoDB.js";


class ProdMongoDB extends ContenedorMongoDB {
  constructor() {
    super("productos", {
      title: { type: String, required: true },
      price: { type: Number, required: true },
      stock: { type: Number, required: true },
    });
  }
}

export default ProdMongoDB;
