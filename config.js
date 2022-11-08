import mongoose from "mongoose";

mongoose.connect("mongodb+srv://MauriDenardi:hCVV0SoSExbyxtVi@cluster0.e1zw3we.mongodb.net/testProyectoFinal?retryWrites=true&w=majority", function(err){
    if(err) {
        console.log(err);
    } else{
        console.log("Base de datos conectada");
    }
    
});

export default mongoose;