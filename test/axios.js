import axios from "axios";

//-------------------POST

// axios
//   .post("http://localhost:8080/api/productos", {
//     title: "Fender Starcaster",
//     price: "170000",
//     stock: "5",
//     filename: "186ee8d7-cc79-4f8d-9deb-faca1f7b4584.png",
//     path: "public/186ee8d7-cc79-4f8d-9deb-faca1f7b4584.png",
//     originalname: "Starcaster.png",
//   })
//   .then((response) => {
//     console.log(response.data);
//   }).catch((error)=>{
//     console.log(error);
//   });

//--------------------GET

axios
  .get("http://localhost:8080/api/productos")
  .then((response) => {
    let data = response.data;
    console.log(data);
  })
  .catch((error) => {
    console.log(error);
  });


//--------------------PUT

// axios
//   .put("http://localhost:8080/api/productos/6390f4883467ca8f391bf077", {
//     id: '6390f4883467ca8f391bf077',
//     title: 'Fender Jazzmaster',
//     price: 250000,
//     stock: 15,
//     filename: '61bc79ad-0326-418c-be24-93d6c8a6bd8e.png',
//     path: 'public/61bc79ad-0326-418c-be24-93d6c8a6bd8e.png',
//     originalname: 'Jazzmaster.png',
//     inCart: false,
//     __v: 0
//   })
//   .then((response) => {
//     console.log(response.data);
//   })
//   .catch((error) => {
//     console.log(error);
//   });


//-------------------DELETE


// axios.delete("http://localhost:8080/api/productos/6390f4883467ca8f391bf077")
// .then((response)=>{
//     console.log(response.data);
// }).catch((error) =>{
//     console.log(error);
// })
