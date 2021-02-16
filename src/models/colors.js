const db = require("../config/mySQL");

module.exports = {
  colorsAll: () => {
    return new Promise((resolve, reject) => {
      const queryString = "SELECT * FROM colors";
      db.query(queryString, (err, data) => {
        if (!err) {
          resolve(data);
        } else {
          reject(err);
        }
      });
    });
  },

  getColorById: (params) => {
    return new Promise((resolve, reject) => {
      const queryString = "SELECT * FROM colors WHERE id = " + params;
      db.query(queryString, (err, data) => {
        if (!err) {
          resolve(data);
        } else {
          reject(err);
        }
      });
    });
  },

  editColor: (req, params) => {
    return new Promise((resolve, reject) => {
      const queryString = "UPDATE colors SET ? WHERE id = " + params;
      db.query(queryString, req, (err, data) => {
        if (!err) {
          resolve(data);
        } else {
          reject(err);
        }
      });
    });
  },

  postColor: (req) => {
    return new Promise((resolve, reject) => {
      const queryString = "INSERT INTO colors SET ?";
      db.query(queryString, req, (err, data) => {
        if (!err) {
          resolve(data);
        } else {
          reject(err);
        }
      });
    });
  },

  deleteColor: (params) => {
    return new Promise((resolve, reject) => {
      const queryString = "DELETE FROM colors WHERE id = " + params;
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
