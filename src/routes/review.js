const express = require("express");
const reviewRouter = express.Router();
const reviewController = require("../controllers/review");
const checkToken = require("../helpers/middlewares/checkToken");

reviewRouter.get('/:id', reviewController.getReviewById);
reviewRouter.get('/:id', reviewController.getReviewById);
reviewRouter.post('/' ,checkToken ,reviewController.postReview);

module.exports = reviewRouter;