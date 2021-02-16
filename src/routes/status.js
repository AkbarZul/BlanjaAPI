const express = require("express");
const statusRouter = express.Router();
const statusController = require("../controllers/status");

statusRouter.get("/", statusController.statusAll);

module.exports = statusRouter;
