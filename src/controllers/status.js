const statusModel = require("../models/status");
const form = require("../helpers/form");

module.exports = {
  statusAll: (_, res) => {
    statusModel
      .statusAll()
      .then((data) => {
        form.success(res, data);
      })
      .catch((err) => {
        form.error(res, err);
      });
  },
};
