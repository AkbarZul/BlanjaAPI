const express = require("express");
const colorsRouter = express.Router();
const colorsController = require("../controllers/colors");

colorsRouter.get("/", colorsController.colorsAll);
colorsRouter.get("/:id", colorsController.getColorById);
colorsRouter.post("/", colorsController.editColor);
colorsRouter.put("/:id", colorsController.postColor);
colorsRouter.delete("/:id", colorsController.deleteColor);

module.exports = colorsRouter;
