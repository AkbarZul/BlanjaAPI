const searchModel = require("../models/search");
const form = require("../helpers/form");

module.exports = {
  searchProduct: (req, res) => {
    const { keyword } = req.query;
    searchModel
      .searchProduct(keyword)
      .then((data) => {
        if (!data.length) {
          res.status(404).json({
            msg: "Data Not Found",
            status: 404,
          });
        } else {
          form.success(res, data);
        }
      })
      .catch((err) => {
        form.error(res, err);
      });
  },
};
