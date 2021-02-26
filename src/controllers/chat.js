const chatModel = require("../models/chat");
const form = require("../helpers/form");

module.exports = {
  addNewMessage: (req, res) => {
    let { body } = req;
    body = {
      ...body,
      created_at: new Date(Date.now()),
    };
    console.log("data ", body);
    chatModel
      .addNewMessage(body)
      .then((result) => {
        if (
          global.io
            .to(body.seller)
            .to(body.buyyer)
            .emit("refresh", "someMessage")
        ) {
          console.log(`Refresh to ${body.seller} and ${body.buyyer}`);
        }
        res.status(result.status).json(result);
      })
      .catch((error) => {
        res.status(error.status).json(error);
      });
  },

  getListChatSeller: (req, res) => {
    const user_id = req.decodedToken.id;
    console.log(user_id);
    chatModel
      .getListChatSeller(user_id)
      .then((data) => {
        form.success(res, data);
      })
      .catch((err) => {
        form.error(res, err);
      });
  },

  getListChatBuyyer: (req, res) => {
    const user_id = req.decodedToken.id;
    chatModel
      .getListChatBuyyer(user_id)
      .then((data) => {
        form.success(res, data);
      })
      .catch((err) => {
        form.error(res, err);
      });
  },

  getNewMessage: (req, res) => {
    const { chatroom } = req.params;
    chatModel
      .getNewMessage(chatroom)
      .then((data) => {
        form.success(res, data);
      })
      .catch((err) => {
        form.error(res, err);
      });
  },
};
