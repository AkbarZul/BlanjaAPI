const db = require("../config/mySQL");

module.exports = {
  conditionAll: () => {
    return new Promise((resolve, reject) => {
      const queryString = "SELECT * FROM conditions";
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
