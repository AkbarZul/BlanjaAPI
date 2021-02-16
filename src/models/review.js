const db = require("../config/mySQL");

module.exports = {
  getAllReview: () => {
    return new Promise((resolve, reject) => {
      const queryString = [
        `SELECT p.id, p.product_name, c.category_name, cd.conditions, p.product_price, p.product_qty, p.product_desc, p.product_photo,  AVG(rating) as rating FROM products as p
            INNER JOIN categories as c ON p.category_id = c.id_categories
            INNER JOIN conditions as cd ON p.condition_id = cd.id
            INNER JOIN ratings ON p.id = ratings.product_id
            GROUP BY p.id`,
        `SELECT r.id, r.product_id, u.full_name, r.review FROM reviews as r INNER JOIN products as p ON r.product_id = p.id INNER JOIN users as u ON r.user_id = u.id
            `,
      ];
      db.query(queryString.join(";"), (err, data) => {
        if (!err) {
          resolve(data);
        } else {
          reject(err);
        }
      });
    });
  },
  getReviewById: (id) => {
    return new Promise((resolve, reject) => {
      const queryString = [
        `SELECT p.id, p.product_name, AVG(rating) as rating FROM products as p
        INNER JOIN categories as c ON p.category_id = c.id_categories
        INNER JOIN conditions as cd ON p.condition_id = cd.id
        INNER JOIN ratings ON p.id = ratings.product_id
        WHERE p.id = ${id}
        GROUP BY p.id`,
        `SELECT r.id, r.product_id, u.full_name, r.review FROM reviews as r INNER JOIN products as p ON r.product_id = p.id INNER JOIN users as u ON r.user_id = u.id WHERE r.product_id = ${id} LIMIT 5`,
        `SELECT product_id, rating, SUM(rating) as "total_rating", COUNT(rating) as "total_user" FROM ratings  WHERE product_id = ${id} GROUP BY rating ORDER BY rating DESC`,
      ];
      db.query(queryString.join(";"), (err, data) => {
        // console.log(data);
        if (!err) {
          resolve(data);
        } else {
          reject(err);
        }
      });
    });
  },
  postReview: (body, user_id, res) => {
    const bodyRating = {
      product_id: body.product_id,
      rating: body.rating,
    };

    const bodyReview = {
      product_id: body.product_id,
      review: body.review,
      user_id: user_id,
    };
    // const newBody = {
    //   ...body,
    //   user_id: user_id,
    // };
    return new Promise((resolve, reject) => {
      const queryCheckUser =
        "SELECT user_id FROM reviews WHERE user_id=" +
        user_id +
        " AND product_id =" +
        body.product_id;
      db.query(queryCheckUser, (err, data) => {
        // console.log(data.length);
        if (data.length === 0) {
          const queryString = [
            "INSERT INTO reviews SET ?",
            "INSERT INTO ratings SET ?",
          ];
          db.query(
            queryString.join(";"),
            [bodyReview, bodyRating],
            (err, data) => {
              if (!err) {
                resolve(data);
              } else {
                reject(err);
              }
            }
          );
        } else {
          reject(
            res.status(403).send({
              message: "Anda sudah me-review produk ini",
              status: 403,
            })
          );
        }
      });
      // const queryString = "INSERT INTO reviews SET ?";
      // db.query(queryString, newBody, (err, data) => {
      //   if (!err) {
      //     resolve(data);
      //   } else {
      //     reject(err);
      //   }
      // });
    });
  },

  getProductById: (id) => {
    return new Promise((resolve, reject) => {
      const queryString = [
        `SELECT p.id, p.product_name, AVG(rating) as rating FROM products as p
            INNER JOIN categories as c ON p.category_id = c.id_categories
            INNER JOIN conditions as cd ON p.condition_id = cd.id
            INNER JOIN ratings ON p.id = ratings.product_id
            WHERE p.id = ${id}
            GROUP BY p.id`,
        `SELECT r.id, r.product_id, u.full_name, r.review FROM reviews as r INNER JOIN products as p ON r.product_id = p.id INNER JOIN users as u ON r.user_id = u.id WHERE r.product_id = ${id} LIMIT 5`,
        `SELECT product_id, rating, SUM(rating) as "total_rating", COUNT(rating) as "total_user" FROM ratings  WHERE product_id = ${id} GROUP BY rating ORDER BY rating DESC`,
      ];
      db.query(queryString.join(";"), (err, data) => {
        if (!err) {
          resolve(data);
        } else {
          reject(err);
        }
      });
    });
  },
};
