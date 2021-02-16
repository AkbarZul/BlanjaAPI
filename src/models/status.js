const db = require("../config/mySQL");

module.exports = {
  statusAll: () => {
    return new Promise((resolve, reject) => {
      const queryString = "SELECT * FROM status_product";
      db.query(queryString, (err, data) => {
        if (!err) {
          resolve(data);
        } else {
          reject(err);
        }
      });
    });
  },
};
