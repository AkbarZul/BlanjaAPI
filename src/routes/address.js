// const express = require("express");
// const addressRouter = express.Router();
// const addressController = require("../controllers/address");
// const checkToken = require("../helpers/middlewares/checkToken");
// // const address = require("../models/address");

// addressRouter.get("/", checkToken, addressController.getAddressByUserId);
// addressRouter.post("/", checkToken, addressController.postAddress);
// addressRouter.put("/:id", checkToken, addressController.updateAddress);


// module.exports = addressRouter;

const addressRouter = require("express").Router();
const addressController = require("../controllers/address");
const checkToken = require("../helpers/middlewares/checkToken");

addressRouter.get("/", checkToken, addressController.getAddressByUser);
// addressRouter.get("/:id", checkToken, addressController.getAddressById);
addressRouter.post("/", checkToken, addressController.addAddress);
addressRouter.patch("/:id", checkToken, addressController.updateAddress);
addressRouter.delete("/:id", checkToken, addressController.deleteAddress);

module.exports = addressRouter;