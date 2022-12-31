/*============================[MODULOS]============================*/
import * as dotenv from 'dotenv'
dotenv.config({ path: './.env' })
import express from "express";
import http from "http"
import cookieParser from "cookie-parser";
import session from "express-session";
import exphbs from "express-handlebars";
import path from "path";
import { fileURLToPath } from "url";
import User from "./models/User.js";
import bcrypt from "bcrypt";
import passport from "passport";
import { Strategy } from "passport-local";
const LocalStrategy = Strategy;
import "./config.js";
import routerProd from "./router/productos.js";
import bodyParser from "body-parser"
import compression from "compression";
import routerLogin from "./router/login.js"
import routerHome from "./router/home.js"
import routerCart from "./router/cart.js";
import routerAdmin from "./router/admin.js";
import routerApi from "./router/api.js"
import Mensaje from "./models/MessagesModel.js"
import multer from "multer"
import { v4 as uuidv4 } from 'uuid';
import {graphqlHTTP} from "express-graphql"
import schema from "./graphql/buildSchema.js";
import {getProd, crearObj, prodPut, routerDelete, getItem} from "./controllers/api.js"
import { notFound, errorHandler } from './middlewares/errorHandler.js';
import routerOrder from './router/order.js';
import routerChat from './router/chat.js';
const app = express();
const server = http.createServer(app);
import { Server } from 'socket.io';
const io = new Server(server)
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);




/*============================[MIDDLEWARES]============================*/
                          
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(compression())
app.use("/public", express.static(path.join(__dirname, 'public')))
const storage = multer.diskStorage({
  destination: path.join(__dirname, "public"),
  filename:(req, file, cb, filename) => {
    cb(null, uuidv4() + path.extname(file.originalname))
  }
})
app.use(multer({storage: storage}).single("image"))
app.use(
  "/graphql",
  graphqlHTTP({
    schema,
    rootValue: {
      getItem,
      getProd,
      crearObj,
      prodPut,
      routerDelete,
    },
    graphiql: true,
  })
);


/*============================[SESSION Y PASSPORT]============================*/

app.use(cookieParser());
app.use(bodyParser.urlencoded({extended: false}))
app.use(
  session({
    secret: "1234567890!@#$%^&*()",
    resave: false,
    saveUninitialized: false,
    cookie: {
      maxAge: 180 * 60 * 1000, 
    },
  })
);

app.use(function(req,res,next){
  res.locals.session = req.session
  next()
})


passport.use(
  new LocalStrategy({
    usernameField: "email"
  },(email, password, done) => {
    User.findOne({ email }, (err, user) => {
      if (err) console.log(err);
      if (!user) return done(null, false);
      bcrypt.compare(password, user.password, (err, isMatch) => {
        if (err) console.log(err);
        if (isMatch) return done(null, user);
        return done(null, false);
      });
    });
  })
);

passport.serializeUser((user, done) => {
  done(null, user._id);
});

passport.deserializeUser(async (id, done) => {
  const user = await User.findById(id);
  return done(null, user);
});

app.use(passport.initialize());
app.use(passport.session());

/*============================[RUTAS]============================*/

app.use(routerLogin)
app.use(routerHome)
app.use(routerProd)
app.use(routerAdmin)
app.use(routerCart)
app.use("/api", routerApi) // Las use mas que nada para testing
app.use(routerOrder)
app.use(routerChat)

//-------ERROR HANDLER
app.use(notFound)
app.use(errorHandler)

/*============================[HANDLEBARS]============================*/

app.set("views", path.join(path.dirname(""), "./views"));
app.engine(
  ".hbs",
  exphbs.engine({
    defaultLayout: "index",
    layoutsDir: path.join(app.get("views"), "layouts"),
    extname: ".hbs",
  })
);
app.set("view engine", ".hbs");

/*============================[SERVIDOR Y SOCKET IO]============================*/

io.on('connection', async (socket) => {
  const mensajes = await Mensaje.find().lean()

   socket.emit("mensajes", mensajes)

  socket.on("newMsj", async mensaje => {
    const msg = new Mensaje(mensaje)
    await msg.save()
    io.sockets.emit("mensajes", msg)
   })
})

const PORT = process.env.PORT || 3000
server.listen(PORT, () => {
  console.log(`Servidor escuchando en puerto ${PORT}`);
});
server.on("error", (error) => {
  console.error(`Error en el servidor ${error}`);
});