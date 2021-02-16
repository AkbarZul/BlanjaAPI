const productsModel = require("../models/products");
const form = require("../helpers/form");

module.exports = {
  productAll: (req, res) => {
    const { query } = req;
    const { keyword } = req.query;
    const limit = Number(query.limit) || 5;
    const page = Number(query.page) || 1;
    const offset = (page - 1) * limit || 0;
    productsModel
      .productAll(limit, offset, page, keyword)
      .then((data) => {
        if (Math.ceil(data.products / limit) == data.products) {
          res.status(404).json({
            msg: "Data Not Found",
            status: 404,
          });
        } else {
          form.nestedAllProduct(res, data[0],data[1]);
        }
      })
      .catch((err) => {
        form.error(res, err);
      });
  },

  getProductById: (req, res) => {
    const { id } = req.params;
    // console.log(req);
    productsModel
      .getProductById(id)
      .then((data) => {
        if (!data.length) {
          res.status(404).json({
            msg: "Data Not Found",
            status: 404,
          });
        } else {
          form.nestedProductById(res, data);
          // console.log(data);
        }
      })
      .catch((err) => {
        form.error(res, err);
      });
  },

  postProduct: (req, res) => {
    const { body } = req;
    const user_id = req.decodedToken.id;
    const level = req.decodedToken.level_id;
    const filepath = JSON.stringify(
      req.files.map(
        (e) => "/image" + "/" + e.filename
      )
    );

    // const filepath = "http://192.168.18.120/phto"

    console.log(user_id, level);
    const insertBody = {
      ...body,
      user_id: user_id,
      product_photo: filepath,
    };
    console.log(insertBody);
    productsModel
      .postProduct(insertBody, level, user_id, res, filepath)
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

  editProduct: (req, res) => {
    const { body } = req;
    const { id } = req.params;
    const level = req.decodedToken.level_id;
    
    const sizes = body.sizes;
    const colors = body.colors
    delete body.sizes;
    delete body.colors;
    const insertBody = { ...body };
    // console.log(insertBody);
    productsModel
      .editProduct(insertBody, id, res, level, sizes, colors)
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

  editProductPhotos: (req, res) => {
    const { id } = req.params;
    const level = req.decodedToken.level_id;
    const singlePath = JSON.stringify(
      req.files.map(
        (e) => "/image" + "/" + e.filename
      )
    );

    productsModel
        .editProductPhotos(singlePath, id, level)
        .then((data) => {
          if (data.affectedRows === 0) {
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
        })
  },

  deleteProduct: (req, res) => {
    const { id } = req.params;
    const level = req.decodedToken.level_id;
    productsModel
      .deleteProduct(id, level)
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
        form.error(res, err);
      });
  },

  getProductByUserId: (req, res) => {
    const user_id = req.decodedToken.id;
    productsModel
      .getProductByUserId(user_id)
      .then((data) => {;
        form.nestedProductByUser(res, data);
      })
      .catch((err) => {
        form.error(res, err);
      });
  },

  filterProduct: (req, res) => {
    const { category, size, color } = req.query;

    productsModel
      .filterProduct(size, color, category)
      .then((data) => {
        form.nestedFilterProduct(res, data);
      })
      .catch((error) => {
        res.status(500).send({
          message: "Failed",
          status: 500,
          error: error,
        });
      });
  },
};
