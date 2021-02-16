const db = require("../config/mySQL");

module.exports = {
  sizeAll: () => {
    return new Promise((resolve, reject) => {
      const queryString = "SELECT * FROM size";
      db.query(queryString, (err, data) => {
        if (!err) {
          resolve(data);
        } else {
          reject(err);
        }
      });
    });
  },

  getSizeById: (params) => {
    return new Promise((resolve, reject) => {
      const queryString = "SELECT * FROM size WHERE id = " + params;
      db.query(queryString, (err, data) => {
        if (!err) {
          resolve(data);
        } else {
          reject(err);
        }
      });
    });
  },

  editSize: (req, params) => {
    return new Promise((resolve, reject) => {
      const queryString = "UPDATE size SET ? WHERE id = " + params;
      db.query(queryString, req, (err, data) => {
        if (!err) {
          resolve(data);
        } else {
          reject(err);
        }
      });
    });
  },

  postSize: (req) => {
    return new Promise((resolve, reject) => {
      const queryString = "INSERT INTO size SET ?";
      db.query(queryString, req, (err, data) => {
        if (!err) {
          resolve(data);
        } else {
          reject(err);
        }
      });
    });
  },

  deleteSize: (params) => {
    return new Promise((resolve, reject) => {
      const queryString = "DELETE FROM size WHERE id = " + params;
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
