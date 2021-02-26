
const chatRouter = require("express").Router();
const chatController = require("../controllers/chat");
const checkToken = require("../helpers/middlewares/checkToken");

chatRouter.post("/addMessage", checkToken, chatController.addNewMessage);
chatRouter.get("/chatRoomSeller", checkToken, chatController.getListChatSeller);
chatRouter.get("/chatRoomBuyyer", checkToken, chatController.getListChatBuyyer);
chatRouter.get("/newMessage/:chatroom", chatController.getNewMessage);

module.exports = chatRouter;