const ratingModel = require("../models/ratings");
const form = require("../helpers/form");

module.exports = {
  postRating: (req, res) => {
    const { body } = req;
    const insertBody = {
      ...body,
    };
    ratingModel
      .postRating(insertBody, res)
      .then((data) => {
        const newResObj = {
          id: data.insertId,
          ...insertBody,
        };
        form.success(res, newResObj);
      })
      .catch((err) => {
        form.error(res, err);
      });
  },
};
