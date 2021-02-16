const express = require("express");
const categoriesRouter = express.Router();
const categoriesController = require("../controllers/categories");

categoriesRouter.get("/", categoriesController.categoryAll);
categoriesRouter.get("/:id", categoriesController.getCategoryById);
categoriesRouter.post("/", categoriesController.postCategory);
categoriesRouter.put("/:id", categoriesController.editCategory);
categoriesRouter.delete("/:id", categoriesController.deleteCategory);
module.exports = categoriesRouter;
