const sortingModel = require("../models/sorting");
const form = require("../helpers/form");

module.exports = {
  sortingProduct: (req, res) => {
    const { keyword } = req.query;
    sortingModel
      .sortingProduct(keyword)
      .then((data) => {
        form.success(res, data);
      })
      .catch((err) => {
        form.error(res, err);
      });
  },
};
