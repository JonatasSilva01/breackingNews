const route = require("express").Router();
const userController = require('../controller/user.controller.js');
route.post("/", userController.create);

module.exports = route;