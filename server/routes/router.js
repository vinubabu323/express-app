const express = require("express");
const route = express.Router();
const services = require("../services/render");
const controller = require("../controller/controller");
const userImageUpload = require("../utils/fileUploader");

route.get("/", services.homeRoutes);
route.get("/add-user", services.add_user);
route.get("/login-user", services.login_user);
route.get("/update-user", services.update_user);

//user crud operations

route.post(
  "/api/users/create",
  userImageUpload.single("image"),
  controller.create
);

route.get("/api/users", controller.find);

route.post(
  "/api/user/update/:id",
  userImageUpload.single("image"),
  controller.update
);

route.delete("/api/user/delete/:id", controller.delete);

module.exports = route;
