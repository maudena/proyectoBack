/*============================[MODULOS]============================*/
import express from "express";
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
import multer from "multer"
import { v4 as uuidv4 } from 'uuid';
const app = express();
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
  new LocalStrategy((username, password, done) => {
    User.findOne({ username }, (err, user) => {
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
app.use("/api", routerApi)

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

/*============================[SERVIDOR]============================*/
const PORT = process.env.PORT || 8080;
const server = app.listen(PORT, () => {
  console.log(`Servidor escuchando en puerto ${PORT}`);
});
server.on("error", (error) => {
  console.error(`Error en el servidor ${error}`);
});