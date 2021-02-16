const express = require("express");
const productsRouter = express.Router();
const productsController = require("../controllers/products");
const checkToken = require("../helpers/middlewares/checkToken");
const uploadImage = require("../helpers/middlewares/multiUpload");
const uploadImg = require("../helpers/middlewares/upload");


productsRouter.get("/", productsController.productAll);
productsRouter.get("/filter", productsController.filterProduct);
productsRouter.get("/user", checkToken, productsController.getProductByUserId);
productsRouter.get("/:id", productsController.getProductById);
productsRouter.post("/", checkToken, uploadImage, productsController.postProduct);
productsRouter.put("/:id", checkToken, uploadImage, productsController.editProduct);
productsRouter.put('/photo/:id', checkToken, uploadImage, productsController.editProductPhotos)
productsRouter.delete("/:id", checkToken, productsController.deleteProduct);

module.exports = productsRouter;
