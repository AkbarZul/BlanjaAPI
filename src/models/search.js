const db = require("../config/mySQL");

module.exports = {
  searchProduct: (keyword) => {
    return new Promise((resolve, reject) => {
      const queryString = `SELECT * FROM products AS p
                INNER JOIN categories AS c ON p.category_id = c.id_categories
                WHERE c.category_name LIKE "%${keyword}%" OR p.product_name LIKE "%${keyword}%"`;
                // INNER JOIN conditions as cd ON p.condition_id = cd.id
      db.query(queryString, (err, data) => {
        if (!err) {
          // console.log();
          resolve(data);
        } else {
          reject(err);
        }
      });
    });
  },
};
