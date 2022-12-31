import User from "../models/User.js";
import bcrypt from "bcrypt"
import { createTransport } from "nodemailer"
import jwt from "jsonwebtoken" // No pude implementarlo
import dotenv from "dotenv"
dotenv.config()

//-------------NODEMAILER CONFIG

const testMail = process.env.TEST_MAIL       //-----Completar con otro email para probar funcionalidad
const testPass = process.env.TEST_PASS
const transporter = createTransport({
  service: "gmail",
  secure: false,
  port: 587,
  auth: {
      user: testMail,
      pass: testPass
  },
  tls: {
    rejectUnauthorized: false
}
});

//------------REGISTRO NUEVO USUARIO

export async function postRegister(req, res){
  const { email, password, fullname, phone } = req.body;
 User.findOne({ email }, async (err, user) => {
    if (err) console.log(err);
    if (user) res.render("register-error");
    if (!user) {
      const hashedPassword = await bcrypt.hash(password, 8);
      const newUser = new User({
        email,
        password: hashedPassword,
        fullname,
        phone,
      });
      await newUser.save();

      const emailContent = {
        from: "Test App Music",
        to: `Administrador ${testMail}`,
        subject: "Nuevo Registro",
        html: `El usuario ${newUser.fullname} se ha registrado correctamente.<br><br> Email: ${newUser.email} <br> Password: ${newUser.password} <br> Telefono: ${newUser.phone} `,
      };
      try {
        await transporter.sendMail(emailContent);
      } catch (error) {
        console.log(error);
      }
      res.redirect("/login");
      
    }
  });
};


//-------JWT. No pude hacer funcionar la verificacion.

// export async function generateToken(obj,req,res){

//   const user = await User.findOne({id: obj._id})
//   const payload = {
//     id: user._id,
//     username: user.username
//   }
//   if(!user){
//     console.log("Usuario no encontrado");
//   }else{
    
//     const token = jwt.sign(payload, process.env.SECRET_KEY,{expiresIn: "20m"})
//     return token
//   }
  
// }

// export async function validateToken(req, res, next){
//   const token = req.headers['authorization']
//   console.log({token});                                        Devuelve undefined
//      console.log("before err");
//   if(!token) res.send("ACCESO DENEGADO")
//   
//   jwt.verify(token, process.env.SECRET_KEY, (err, user)=>{
//     if (err) {
//       res.send("ACCESO DENEGADO, TOKEN INVALIDO O EXPIRADO")
//     }else{
//       next()
//     }
//   })
// }