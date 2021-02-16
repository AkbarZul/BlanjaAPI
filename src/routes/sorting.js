const express = require("express");
const sortingRouter = express.Router();
const sortingController = require("../controllers/sorting")

sortingRouter.get("/", sortingController.sortingProduct);

module.exports = sortingRouter;