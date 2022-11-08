import express from 'express';
const { Router } = express;
const routerAdmin = Router();

routerAdmin.get("/admin", (req, res) =>{
    res.render("prodForm")
})

export default routerAdmin