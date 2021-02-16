const db = require("../config/mySQL");

module.exports = {
  categoryAll: () => {
    return new Promise((resolve, reject) => {
      const queryString = "SELECT * FROM categories";
      db.query(queryString,(err, data) => {
        if (!err) {
          resolve(data);
        } else {
          reject(err);
        }
      });
    });
  },

  getCategoryById: (params, res, keyword) => {
    return new Promise((resolve, reject) => {
      // const queryString = ["SELECT * FROM categories WHERE id_categories ="+params, "SELECT * FROM products INNER JOIN categories ON products.category_id = categories.id_categories WHERE category_id="+params];
      const queryString = ["SELECT * FROM categories WHERE id_categories ="+params, 
      `SELECT p.id, p.product_name, c.category_name, cd.conditions, p.product_price, p.product_qty, p.product_desc, p.product_photo,  IFNULL(AVG(rating),0) as rating, COUNT(review) as review FROM products as p
      INNER JOIN categories as c ON p.category_id = c.id_categories
      INNER JOIN conditions as cd ON p.condition_id = cd.id
      LEFT JOIN ratings ON p.id = ratings.product_id
      LEFT JOIN reviews ON p.id = reviews.product_id
      WHERE c.id_categories = ${params} GROUP BY p.id ORDER BY ${keyword}`];
      db.query(queryString.join(';'), keyword, (err, data) => {
        if (!err) {
          resolve(data);
        } else {
          reject(err);
        }
      });
    });
  },

  editCategory: (req, params) => {
    return new Promise((resolve, reject) => {
      const queryString = "UPDATE categories SET ? WHERE id = "+ params;
      db.query(queryString, req, (err, data) => {
        if (!err) {
          resolve(data);
        } else {
          reject(err);
        }
      });
    });
  },
  
  postCategory: (req) => {
    return new Promise((resolve, reject) => {
      const queryString = "INSERT INTO categories SET ?";
      db.query(queryString, req, (err, data) => {
        if (!err) {
          resolve(data);
        } else {
          reject(err);
        }
      });
    });
  },

  deleteCategory: (params) => {
    return new Promise((resolve, reject) => {
      const queryString = "DELETE FROM categories WHERE id = "+ params;
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
