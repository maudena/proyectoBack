import express from "express";
import { auth } from "../middlewares/auth.js";
import { getHome } from "../controllers/home.js";
import { getProfile } from "../controllers/home.js";
import { getLogout } from "../controllers/home.js";
const { Router } = express;
const routerHome = Router();

routerHome.get("/home", auth, getHome);
routerHome.get("/profile", getProfile);
routerHome.get("/logout", getLogout);

export default routerHome;
