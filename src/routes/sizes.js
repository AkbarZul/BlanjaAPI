const express = require("express");
const sizesRouter = express.Router();
const sizesController = require("../controllers/sizes");

sizesRouter.get("/", sizesController.sizeAll);
sizesRouter.get("/:id", sizesController.getSizeById);
sizesRouter.post("/", sizesController.postSize);
sizesRouter.put("/:id", sizesController.editSize);
sizesRouter.delete("/:id", sizesController.deleteSize);

module.exports = sizesRouter;
