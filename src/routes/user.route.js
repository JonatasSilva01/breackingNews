const route = require("express").Router();
const userController = require('../controller/user.controller.js');

route.post("/", userController.create);
route.get("/", userController.findAll);
route.get("/:id", userController.findById);

module.exports = route;