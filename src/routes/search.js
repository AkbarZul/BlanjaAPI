const express = require("express");
const searchRouter = express.Router();
const searchController = require("../controllers/search");

searchRouter.get("/", searchController.searchProduct);

module.exports = searchRouter