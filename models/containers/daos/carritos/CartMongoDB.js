import ContenedorMongoDB from "../../ContenedorMongoDB.js";

class CartMongoDB extends ContenedorMongoDB{
    constructor(){
        super('carritos',{
            productos: {type: [], required: true}
        })
    }

    async guardar(carrito = {productos: []}){
        return super.guardar(carrito)
    }
}

export default CartMongoDB