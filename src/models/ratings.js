const db = require("../config/mySQL");

module.exports = {
  postRating: (req) => {
    return new Promise((resolve, reject) => {
      const queryString = "INSERT INTO ratings SET ?";
      db.query(queryString, req, (err, data) => {
        if (!err) {
          resolve(data);
        } else {
          reject(err);
        }
      });
    });
  },
};
