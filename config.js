import mongoose from "mongoose";
import dotenv from "dotenv"
dotenv.config()

mongoose.connect(process.env.MONGOURI,  function(err){
    if(err) {
        console.log(err);
    } else{
        console.log("Base de datos conectada");
    }
    
});

export default mongoose;