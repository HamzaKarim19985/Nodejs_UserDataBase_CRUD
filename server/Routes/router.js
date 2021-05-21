//const { Router } = require("express");
const express = require("express");
//Creates router in a diff file insead of creating a new app in this file
const route = express.Router();
const services = require("../services/render");
const controller = require("../controller/controller");
// ROUTES -- Use route variable instead of app, get routes from render.js, where it renders appropriate ejs file
route.get("/", services.homeRoutes);
route.get("/add_user", services.add_user);
route.get("/update_user", services.update_user);

//API to save and create via POST
route.post("/api/users", controller.create);
route.get("/api/users", controller.find);
route.put("/api/users/:id", controller.update);
route.delete("/api/users/:id", controller.delete);
module.exports = route;
