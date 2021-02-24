const orderModel = require("../models/orders");
const form = require("../helpers/form");

module.exports = {
  getAllOrdersHistory: (req, res) => {
    const { body } = req;
    console.log("CEK ",req.decodedToken);
    const user_id = req.decodedToken.id;
    const level = req.decodedToken.level_id;


    orderModel
      .getAllOrdersHistory(level, user_id)
      .then((data) => {
        form.nestedAll(res, data);
        console.log(data);
      })
      .catch((error) => {
        res.status(500).send({
          message: "failed",
          status: false,
          error: error,
        });
      });
  },

  getTransactionById: (req, res) => {
    const { id } = req.params;
    const user_id = req.decodedToken.id;

    orderModel
      .getOrderById(id, user_id)
      .then((data) => {
        form.nestedOne(res, data);
      })
      .catch((error) => {
        res.status(500).send({
          message: "failed",
          status: false,
          error: error,
        });
      });
  },

  postOrders: (req, res) => {
    const { body } = req;
    const user_id = req.decodedToken.id;
    const level = req.decodedToken.level_id;

    orderModel
      .postOrders(body, level, user_id)
      .then((data) => {
        const newResObj = {
          id: data.insertId,
          ...body,
        };
        form.success(res, newResObj);
      })
      .catch((err) => {
        form.error(res, err);
      });
  },

  getAllOrderHistorySeller: (req, res) => {
    const user_id = req.decodedToken.id;
    // const user_id = 7;
    // const level = req.decodedToken.level_id;


    orderModel
      .getAllOrderHistorySeller(user_id)
      .then((data) => {
        form.nestedAll(res, data);
        console.log(data);
      })
      .catch((error) => {
        res.status(500).send({
          message: "failed",
          status: false,
          error: error,
        });
      });
  },

  updateStatusOrder: (req, res) => {
    const {id} = req.params;
    const {body} = req;
    const level = req.decodedToken.level_id;

    orderModel
    .updateStatusOrder(id, body, level)
    .then((data) => {
      res.status(200).send(data)
    })
    .catch((err)=> {
      res.status(500).send(err)
      console.log(err);
    });
  }
};
