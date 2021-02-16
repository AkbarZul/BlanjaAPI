const express = require("express");
const ratingRoute = express.Router();
const ratingController = require("../controllers/ratings");

ratingRoute.post("/", ratingController.postRating);

module.exports = ratingRoute;
