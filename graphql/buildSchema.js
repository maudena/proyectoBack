import {buildSchema} from "graphql"

const schema = buildSchema(`
  type Producto {
    id: ID,
    title: String,
    price: Int,
    stock: Int
  }
  type Query {
    getItem(id: ID): Producto,
    getProd: [Producto],
  }
  type Mutation {
    crearObj(
        title: String!,
        price: Int!,
        stock: Int!
        ): Producto

    prodPut(
        id: ID,
        title: String!,
        price: Int!,
        stock: Int!): Producto,

    routerDelete(id: ID): Producto,
  }
`);

export default schema;