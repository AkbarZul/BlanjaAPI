const colorsModel = require("../models/colors");
const form = require("../helpers/form");

module.exports = {
  colorsAll: (_, res) => {
    colorsModel
      .colorsAll()
      .then((data) => {
        form.success(res, data);
      })
      .catch((err) => {
        form.error(err);
      });
  },

  getColorById: (req, res) => {
    const { id } = req.params;
    colorsModel
      .getColorById(id, res)
      .then((data) => {
        if (!data.length) {
          res.status(404).json({
            msg: "Data Not Found",
            status: 404,
          });
        } else {
          form.success(res, data[0]);
        }
      })
      .catch((err) => {
        form.error(err);
      });
  },

  editColor: (req, res) => {
    const { body } = req;
    const insertBody = {
      ...body,
    };
    const { id } = req.params;
    colorsModel
      .editColor(insertBody, id, res)
      .then((data) => {
        if (data.affectedRows === 0) {
          res.status(404).json({
            msg: "Data Not Found",
            status: 404,
          });
        } else {
          const newResObj = {
            id: id,
            ...insertBody,
          };
          form.success(res, newResObj);
        }
      })
      .catch((err) => {
        form.error(err);
      });
  },

  postColor: (req, res) => {
    const { body } = req;
    const insertBody = {
      ...body,
    };
    colorsModel
      .postColor(insertBody, res)
      .then((data) => {
        const newResObj = {
          id: data.insertId,
          ...insertBody,
        };
        form.success(res, newResObj);
      })
      .catch((err) => {
        form.error(err);
      });
  },

  deleteColor: (req, res) => {
    const { id } = req.params;
    colorsModel
      .deleteColor(id, res)
      .then((data) => {
        if (data.affectedRows === 0) {
          res.status(404).json({
            msg: "Data Not Found",
            status: 404,
          });
        } else {
          const newResObj = {
            msg: "Data Deleted",
            status: 200,
          };
          res.json(newResObj);
        }
      })
      .catch((err) => {
        form.error(err);
      });
  },
};
