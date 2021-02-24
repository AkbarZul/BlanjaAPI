const express = require("express");
const orders = express.Router();
const ordersController = require("../controllers/orders");
const checkToken = require("../helpers/middlewares/checkToken");

orders.get("/", checkToken, ordersController.getAllOrdersHistory);
orders.get("/seller", checkToken, ordersController.getAllOrderHistorySeller);
orders.put("/seller/:id", checkToken, ordersController.updateStatusOrder);
orders.get("/:id", checkToken, ordersController.getTransactionById);
orders.post("/", checkToken, ordersController.postOrders);

// getAllOrderHistorySeller

module.exports = orders;
