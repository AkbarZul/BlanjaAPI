const express = require("express");
const conditionRouter = express.Router();
const conditionController = require("../controllers/condition");

conditionRouter.get("/", conditionController.conditionAll);

module.exports = conditionRouter;
