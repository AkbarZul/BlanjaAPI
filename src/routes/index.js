const express = require("express");
const mainRouter = express.Router();

const welcomeRouter = require("./welcome");
const categoriesRouter = require("./categories");
const sizesRouter = require("./sizes");
const colorsRouter = require("./colors");
const productsRouter = require("./products");
const searchRouter = require("./search");
const sortingRouter = require("./sorting");
const ratingRoute = require("./ratings");
const orders = require("./orders");
const authRouter = require("./auth");
const addressRouter = require("./address");
const statusRouter = require("./status");
const conditionRouter = require("./condition");
const reviewRouter = require("./review");
const chatRouter = require("./chat");

mainRouter.use("/", welcomeRouter);
mainRouter.use("/categories", categoriesRouter);
mainRouter.use("/sizes", sizesRouter);
mainRouter.use("/colors", colorsRouter);
mainRouter.use("/products", productsRouter);
mainRouter.use("/search", searchRouter);
mainRouter.use("/sorting", sortingRouter);
mainRouter.use("/ratings", ratingRoute);
mainRouter.use("/orders", orders);
mainRouter.use("/auth", authRouter);
mainRouter.use("/address", addressRouter);
mainRouter.use("/status", statusRouter);
mainRouter.use("/condition", conditionRouter);
mainRouter.use("/chat", chatRouter);
mainRouter.use("/review", reviewRouter);

module.exports = mainRouter;
