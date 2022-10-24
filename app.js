/*============================[Modulos]============================*/
import express from "express";
import cookieParser from "cookie-parser";
import session from "express-session";
import exphbs from "express-handlebars";
import path from "path";
import User from "./models/User.js";
import bcrypt from "bcrypt";
import passport from "passport";
import { Strategy } from "passport-local";
const LocalStrategy = Strategy;
import "./config.js";
import { auth } from "./middlewares/auth.js";
import routerProd from "./router/productos.js";
import bodyParser from "body-parser"
import { productos as productosApi } from "./items.js"
import compression from "compression";
import pino from "pino"
const app = express();
const logger = pino()
logger.level = "info"
const warnLogger = pino("warn.log")

/*============================[Middlewares]============================*/

/*----------- Session y Passport -----------*/
app.use(cookieParser());
app.use(bodyParser.urlencoded({extended: false}))
app.use(
  session({
    secret: "1234567890!@#$%^&*()",
    resave: false,
    saveUninitialized: false,
    cookie: {
      maxAge: 300000, // 5 minutos
    },
  })
);

app.use(compression())
app.use(passport.initialize());
app.use(passport.session());
app.use("/static",  express.static("./static/"))
app.use(routerProd)

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

/*----------- Handlebars -----------*/
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

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

/*============================[Rutas Home, falta pasarlas a routes]============================*/

app.get("/", (req, res) => {
  let {url, method} = req
  logger.info("Peticion recibida a %s metodo %s",url, method)
  if (req.session.username) {
    res.redirect("/home");
  } else {
    res.redirect("/login");
  }
});

app.get("/home", auth, async (req,res) =>{
  let {url, method} = req
  logger.info("Peticion recibida a %s metodo %s",url, method)
  const datosUsuario = await User.findById(req.user._id).lean();
  const productos = await productosApi.listarAll()
  res.render("prodForm", {
    datos: datosUsuario,
    productos: productos
  })
})

app.get("/login", (req, res) => {
  let {url, method} = req
  logger.info("Peticion recibida a %s metodo %s",url, method)
  res.render("login");
});

app.get("/login-error", (req, res) => {
  let {url, method} = req
  logger.info("Peticion recibida a %s metodo %s",url, method)
  res.render("login-error");
});

app.post("/login", passport.authenticate("local", {failureRedirect: "login-error"}),(req, res) => {
  let {url, method} = req
  logger.info("Peticion recibida a %s metodo %s",url, method)
    res.redirect("/home");
  }
);

app.get("/register", (req, res) => {
  let {url, method} = req
  logger.info("Peticion recibida a %s metodo %s",url, method)
  res.render("register");
});

app.post("/register", (req, res) => {
  let {url, method} = req
  logger.info("Peticion recibida a %s metodo %s",url, method)
  const { username, password} = req.body;
  User.findOne({ username }, async (err, user) => {
    if (err) console.log(err);
    if (user) res.render("register-error");
    if (!user) {
      const hashedPassword = await bcrypt.hash(password, 8);
      const newUser = new User({
        username,
        password: hashedPassword,
      });
      await newUser.save();
      res.redirect("/login");
    }
  });
});

app.get("/logout", (req, res) => {
  let {url, method} = req
  logger.info("Peticion recibida a %s metodo %s",url, method)
  req.logout(function (err) {
    if (err) {
      return next(err);
    }
    res.redirect("/");
  });
});

app.get("/info", (req, res) =>{
  let {url, method} = req
  logger.info("Peticion recibida a %s metodo %s",url, method)
  res.send(
      `Sistema operativo: ${process.platform}
      Version de Node: ${process.version}
      Process Id: ${process.pid}
      Memoria total reservada: ${process.memoryUsage().rss}
      Directorio: ${process.cwd()}
      Path de ejecucion: ${process.execPath}`
      
  )
})

app.get("*", (req, res) =>{
  let {url, method} = req
  logger.warn("Ruta %s %s no implementada",url, method)
  warnLogger.warn("Ruta %s %s no implementada",url, method)
  res.send(`Ruta ${url} ${method} no implementada`)
})

/*============================[Servidor]============================*/
const PORT = 8080;
const server = app.listen(PORT, () => {
  console.log(`Servidor escuchando en puerto ${PORT}`);
});
server.on("error", (error) => {
  console.error(`Error en el servidor ${error}`);
});