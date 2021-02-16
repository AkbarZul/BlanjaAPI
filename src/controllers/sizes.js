const sizeModel = require("../models/sizes");
const form = require("../helpers/form");

module.exports = {
  sizeAll: (_, res) => {
    sizeModel
      .sizeAll()
      .then((data) => {
        form.success(res, data);
      })
      .catch((err) => {
        form.error(res, err);
      });
  },

  getSizeById: (req, res) => {
    const { id } = req.params;
    sizeModel
      .getSizeById(id, res)
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
        form.error(res, err);
      });
  },

  editSize: (req, res) => {
    const { body } = req;
    const insertBody = {
      ...body,
    };
    const { id } = req.params;
    sizeModel
      .editSize(insertBody, id, res)
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
        form.error(res, err);
      });
  },

  postSize: (req, res) => {
    const { body } = req;
    const insertBody = {
      ...body,
    };
    // console.log(req);
    sizeModel
      .postSize(insertBody, res)
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

  deleteSize: (req, res) => {
    const { id } = req.params;
    sizeModel
      .deleteSize(id, res)
      .then((data) => {
        if (data.affectedRows === 0) {
          res.status(404).json({
            msg: "Data Not Found",
            status: 404,
          });
        } else {
          const resObject = {
            msg: "Data Deleted",
            status: 200,
          };
          res.json(resObject);
        }
      })
      .catch((err) => {
        form.error(res, err);
      });
  },
};
