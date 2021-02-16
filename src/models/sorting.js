const db = require("../config/mySQL");

module.exports = {
  sortingProduct: (keyword) => {
    return new Promise((resolve, reject) => {
      // const queryString = "SELECT * FROM products ORDER BY " + keyword;
      const queryString = `SELECT p.id, p.product_name, c.category_name, s.size, cl.color_hexa, cd.conditions, p.product_price, p.product_qty, p.product_desc, p.product_photo,  AVG(rating) as rating FROM products as p
      INNER JOIN categories as c ON p.category_id = c.id_categories
      INNER JOIN size as s ON p.size_id = s.id
      INNER JOIN colors as cl ON p.color_id = cl.id
      INNER JOIN conditions as cd ON p.condition_id = cd.id
      INNER JOIN ratings ON p.id = ratings.product_id
      GROUP BY p.id ORDER BY ${keyword}`
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
