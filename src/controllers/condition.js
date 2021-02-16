const conditionModel = require("../models/condition");
const form = require("../helpers/form");

module.exports = {
  conditionAll: (_, res) => {
    conditionModel
      .conditionAll()
      .then((data) => {
        form.success(res, data);
      })
      .catch((err) => {
        form.error(res, err);
      });
  },
};
