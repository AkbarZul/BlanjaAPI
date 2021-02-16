const reviewModel = require("../models/review");
const form = require("../helpers/form");

module.exports = {
  getAllReview: (req, res) => {
    reviewModel
      .getAllReview()
      .then((data) => {
        form.nestedAllReview(res, data);
      })
      .catch((error) => {
        res.status(500).send({
          message: "failed",
          status: false,
          error: error,
        });
      });
  },

  getReviewById: (req, res) => {
    const { id } = req.params;
    reviewModel
      .getReviewById(id)
      .then((data) => {
        form.nestedReviewById(res, data);
      })
      .catch((error) => {
        res.status(500).send({
          message: "failed",
          status: false,
          error: error,
        });
      });
  },

  postReview: (req, res) => {
    const { body } = req;

    // //ibarat decodedToken... aku keder njukut user_id
    // const decodedToken = {
    //   user_id: 4,
    //   email: "example@example.com",
    // };

    const user_id = req.decodedToken.id;

    reviewModel
      .postReview(body, user_id, res)
      .then((data) => {
        res.status(200).send({
          message: "success",
          status: true,
          data: data,
        });
      })
      .catch((error) => {
        res.status(500).send({
          message: "failed",
          status: false,
          error: error,
        });
      });
  },

  getProductById: (req, res) => {
    const { id } = req.params;
    reviewModel
      .getProductById(id)
      .then((data) => {
        form.nestedReviewByProductId(res, data);
      })
      .catch((error) => {
        res.status(500).send({
          message: "failed",
          status: false,
          error: error,
        });
      });
  },
};
