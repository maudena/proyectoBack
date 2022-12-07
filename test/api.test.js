import supertest from "supertest";
import { expect } from "chai";

let request;

describe("Pruebas API", () => {
  before(async function () {
    request = supertest("http://localhost:8080/api/productos");
  });
  describe("GET PRODUCTOS", () => {
    it("Retornar lista de productos y status code 200", async () => {
      let response = await request.get("/");
      console.log(response._body);
      expect(response.status).to.eql(200);
    });
  });

    // describe("POST PRODUCTO", () => {
    //   it("Incorporar nuevo producto y retornar status 200", async () => {
    //     const item = {
    //       title: "Fender Jazzmaster",
    //       price: 210000,
    //       stock: 15,
    //       filename: "61bc79ad-0326-418c-be24-93d6c8a6bd8e.png",
    //       path: "public/61bc79ad-0326-418c-be24-93d6c8a6bd8e.png",
    //       originalname: "Jazzmaster.png",
    //     };

    //     const response = await request.post("/").send(item)
    //     expect(response.status).to.eql(200)
    //   });
    // });


  // TRAER ID DEL PRODUCTO CREADO EN EL POST

  // describe("PUT PRODUCTO", () => {
  //   it("Actualizar datos de producto, status 200", async () => {
  //     const item = {
  //       id: '',                               
  //       title: "Fender Jazzmaster",
  //       price: 250000,
  //       stock: 10,
  //       filename: "61bc79ad-0326-418c-be24-93d6c8a6bd8e.png",
  //       path: "public/61bc79ad-0326-418c-be24-93d6c8a6bd8e.png",
  //       originalname: "Jazzmaster.png",
  //     };
  //     const response = await request.put("/63852cdda51b614a9d84472d").send(item);
  //     expect(response.status).to.eql(200)
  //   });
  // });

// describe("DELETE PRODUCTO", () =>{
//     it("Eliminar el producto pasado por id de la base de datos, status 200", async () =>{
//         const response = await request.delete("/6390f8155a54397f82f161aa")
//         expect(response.status).to.eql(200)
//     })
// })
 });
