const db = require("../config/mySQL");

module.exports = {
  addNewMessage: (body) => {
    return new Promise((resolve, reject) => {
      const queryString = `INSERT INTO chat SET ?`;
      db.query(queryString, body, (err, data) => {
        if (!err) {
          resolve({
            status: 200,
            message: `Message Sent`,
          });
        } else {
          reject({
            status: 500,
            message: `Message not sent!`,
            detals: err,
          });
        }
      });
    });
  },

  getListChatSeller: (user_id) => {
    return new Promise((resolve, reject) => {
      const queryString = `SELECT chatroom from chat WHERE seller = ? GROUP BY chatroom`;
      db.query(queryString, user_id, (err, data) => {
        if (!err) {
          if (data.length > 0) {
            resolve(data);
          } else {
            resolve(data);
          }
        } else {
          reject(err);
        }
      });
    });
  },

  getListChatBuyyer: (id) => {
    return new Promise((resolve, reject) => {
      const queryString = `SELECT chatroom from chat WHERE buyyer = ? GROUP BY chatroom`;
      db.query(queryString, id, (err, data) => {
        if (!err) {
          if (data.length > 0) {
            resolve(data);
          } else {
            resolve(data);
          }
        } else {
          reject(err);
        }
      });
    });
  },

  getNewMessage: (chatroom) => {
    return new Promise((resolve, reject) => {
      const queryString = `SELECT c.id, c.seller, c.buyyer, c.chatroom, c.sender as sender_id, u.full_name as sender_name, c.message, c.created_at FROM chat c JOIN users u on c.sender = u.id WHERE c.chatroom = ? ORDER BY c.created_at DESC`;
      db.query(queryString, chatroom, (err, data) => {
        if (!err) {
          if (data.length > 0) {
            resolve(data);
          } else {
            resolve(data);
          }
        } else {
          reject(err);
        }
      });
    });
  },
};
