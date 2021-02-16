const db = require("../config/mySQL");
const fs = require("fs");

module.exports = {
  productAll: (limit, offset, page, keyword) => {
    let totalPage = 0;
    const getTotalProduct = new Promise((resolve, reject) => {
      const qs = " SELECT COUNT(id) as total FROM products";
      db.query(qs, (err, result) => {
        if (!err) {
          resolve(result);
        } else {
          reject(err);
        }
      });
    });
    getTotalProduct
      .then((result) => {
        totalPage = result[0].total;
        console.log(totalPage);
      })
      .catch((err) => {
        form.error(res, err);
      });

    return new Promise((resolve, reject) => {
      const queryString = [
        `SELECT p.id, p.product_name, c.category_name, cd.conditions, p.product_price, p.product_qty, p.product_desc, p.product_photo, p.created_at,  IFNULL(AVG(rating),0) as rating, COUNT(review) as review FROM products as p
        INNER JOIN categories as c ON p.category_id = c.id_categories
        INNER JOIN conditions as cd ON p.condition_id = cd.id
        LEFT JOIN ratings ON p.id = ratings.product_id
        LEFT JOIN reviews ON p.id = reviews.product_id
        GROUP BY p.id ORDER BY ${keyword} LIMIT ? OFFSET ?`,
        `SELECT * FROM product_sizes as ps INNER JOIN size as s ON s.id = ps.size_id`,
        `SELECT * FROM product_colors as pc INNER JOIN colors as c ON c.id = pc.color_id`,
      ];

      db.query(
        queryString.join(";"),
        [limit, offset, page, keyword],
        (err, data) => {
          // console.log(totalPage);
          const newResult = {
            products: data,
            pageInfo: {
              currentPage: page,
              previousPage:
                page === 1 ? null : `/products?page=${page - 1}&limit=${limit}`,
              nextPage:
                (page === limit) !== data[0].length && limit !== data[0].length
                  ? null
                  : `/products?page=${page + 1}&limit=${limit}`,
              totalPage: Math.ceil(totalPage / limit),
            },
          };
          if (data.length == 0) {
            reject({
              msg: "data tidak tersedia",
            });
          }
          if (!err) {
            resolve([newResult, keyword]);
          } else {
            reject(err);
          }
        }
      );
    });
  },

  getProductById: (params) => {
    return new Promise((resolve, reject) => {
      const queryString = [
        `SELECT p.id, p.product_name, c.category_name, p.product_price, p.product_qty, p.product_desc, p.product_photo, p.user_id FROM products as p
            INNER JOIN categories as c ON p.category_id = c.id_categories WHERE id = ${params}`,
        `SELECT * FROM product_sizes as ps INNER JOIN size as s ON s.id = ps.size_id WHERE product_id = ${params}`,
        `SELECT * FROM product_colors as pc INNER JOIN colors as c ON c.id = pc.color_id WHERE product_id = ${params}`,
        `SELECT product_id, AVG(rating) as rating FROM ratings WHERE product_id = ${params} GROUP BY product_id`,
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

  postProduct: (req, level, user_id, filepath) => {
    return new Promise((resolve, reject) => {
      console.log(req);
      const bodyProduct = {
        product_name: req.product_name,
        category_id: req.category_id,
        condition_id: req.condition_id,
        product_price: req.product_price,
        product_qty: req.product_qty,
        product_desc: req.product_desc,
        status_product_id: req.status_product_id,
        user_id: req.user_id,
        product_photo: req.product_photo,
      };
      const queryString = "INSERT INTO products SET ?";
      if (level !== 2) {
        reject({
          msg: "Just Seller can Upload Products",
          status: 401,
        });
      } else {
        db.query(queryString, [bodyProduct], (err, data) => {
          const queryStringSize = "INSERT INTO product_sizes SET ?";
          const queryStringColor = "INSERT INTO product_colors SET ?";

          // Ini digunakan waktu udah masuk ke react native

          req.sizes.map((size) => {
            const bodySize = {
              product_id: data.insertId,
              size_id: size,
            };
            db.query(queryStringSize, bodySize);
          });

          req.colors.map((color) => {
            const bodyColor = {
              product_id: data.insertId,
              color_id: color,
            };
            db.query(queryStringColor, bodyColor);
          });
          if (!err) {
            resolve(data);
          } else {
            reject(err);
          }
        });
      }
    });
  },

  editProduct: (req, params, res, level, sizes, colors) => {
    return new Promise((resolve, reject) => {
      const queryString = [
        `DELETE FROM product_sizes WHERE product_id = ${params}`,
        `DELETE FROM product_colors WHERE product_id = ${params}`,
      ];
      if (level !== 2) {
        reject({
          msg: "Just Seller can Edit Product",
          status: 401,
        });
      } else {
        const queryUpdateProduct = "UPDATE products SET ? WHERE id = ?";

        db.query(queryString.join(";"), (err, data) => {
          if (!err) {
            db.query(queryUpdateProduct, [req, params], (err, data) => {
              const queryStringSize = "INSERT INTO product_sizes SET ?";
              const queryStringColor = "INSERT INTO product_colors SET ?";

              sizes.map((size) => {
                const bodySize = {
                  product_id: params,
                  size_id: size,
                };
                db.query(queryStringSize, bodySize);
              });

              colors.map((color) => {
                const bodyColor = {
                  product_id: params,
                  color_id: color,
                };
                db.query(queryStringColor, bodyColor);
              });
              if (!err) {
                resolve(data);
              } else {
                reject(err);
              }
            });
          } else {
            reject({
              msg: "Error",
              status: 500,
            });
          }
        });
      }
    });
  },

  editProductPhotos: (body, id, level) => {
    let photo = "";

    const findPhoto = new Promise((resolve, reject) => {
      const queryFindPhotos =
        "SELECT product_photo FROM products WHERE id = " + id;
      db.query(queryFindPhotos, (err, data) => {
        if (!err) {
          resolve(data);
        } else {
          reject(err);
        }
      });
    });

    findPhoto.then((data) => {
      return (photo = data[0].product_photo);
      console.log("Luar Promise ", photo);
    });

    return new Promise((resolve, reject) => {
      if (level !== 2) {
        reject({
          msg: "Just Seller can Edit Product",
          status: 401,
        });
      } else {
        const queryString =
          "UPDATE products SET product_photo = ? WHERE id = ?";
        db.query(queryString, [body, id], (err, data) => {
          //Delete photo from directory
          JSON.parse(photo).map((photo) => {
            //get name file from url
            let newPhoto = photo.split("/").pop();
            if (fs.existsSync("public/image/" + newPhoto.trim())) {
              fs.unlink("public/image/" + newPhoto.trim(), (err) => {
                reject({
                  msg: "Error",
                  status: 500,
                  error: err,
                });
              });
            }
          });
          if (!err) {
            console.log("Dalam Promise", photo);
            resolve({
              msg: "Edit photos is successfully",
              status: 200,
            });
          } else {
            reject({
              msg: "Edit photos is failed",
              status: 500,
              error: err,
            });
          }
        });
      }
    });
  },

  deleteProduct: (params, level) => {
    let photo = "";

    const findPhoto = new Promise((resolve, reject) => {
      const queryFindPhotos =
        "SELECT product_photo FROM products WHERE id = " + params;
      db.query(queryFindPhotos, (err, data) => {
        if (!err) {
          resolve(data);
        } else {
          reject(err);
        }
      });
    });

    findPhoto.then((data) => {
      return (photo = data[0].product_photo);
      console.log("Luar Promise ", photo);
    });

    return new Promise((resolve, reject) => {
      const queryString = [
        `DELETE FROM products WHERE id = ${params}`,
        `DELETE FROM product_sizes WHERE product_id = ${params}`,
        `DELETE FROM product_colors WHERE product_id = ${params}`,
      ];
      if (level < 2) {
        reject({
          msg: "Just Seller can Delete Products",
          status: 401,
        });
      } else {
        db.query(queryString.join(";"), (err, data) => {
          JSON.parse(photo).map((photo) => {
            //get name file from url
            let newPhoto = photo.split("/").pop();
            if (fs.existsSync("public/image/" + newPhoto.trim())) {
              fs.unlink("public/image/" + newPhoto.trim(), (err) => {
                reject({
                  msg: "Error",
                  status: 500,
                  error: err,
                });
              });
            }
          });
          if (!err) {
            resolve(data);
          } else {
            reject(err);
          }
        });
      }
    });
  },

  getProductByUserId: (user_id) => {
    return new Promise((resolve, reject) => {
      // const queryString = `SELECT p.id, p.product_name, c.category_name, s.size, cl.color_hexa, cd.conditions, p.product_price, p.product_qty, p.product_desc, p.product_photo,  AVG(rating) as rating FROM products as p
      // INNER JOIN categories as c ON p.category_id = c.id_categories
      // INNER JOIN conditions as cd ON p.condition_id = cd.id
      // INNER JOIN ratings ON p.id = ratings.product_id
      // WHERE p.user_id = ? GROUP BY p.id `;
      const queryString = [
        `SELECT p.id, p.product_name, c.category_name, p.product_price, p.product_qty, p.product_desc, p.product_photo, p.user_id FROM products as p
        INNER JOIN categories as c ON p.category_id = c.id_categories 
        WHERE user_id=${user_id}`,
        `SELECT * FROM product_sizes as ps INNER JOIN size as s ON s.id = ps.size_id`,
        `SELECT * FROM product_colors as pc INNER JOIN colors as c ON c.id = pc.color_id`,
        `SELECT product_id, AVG(rating) as rating FROM ratings GROUP BY product_id`,
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

  filterProduct: (size, color, category) => {
    return new Promise((resolve, reject) => {
      const queryStringFilter = [
        `SELECT p.id, p.product_name, p.condition_id, p.product_price, p.product_desc, p.product_photo, p.user_id, p.status_product_id FROM products AS p 
        INNER JOIN product_sizes as s ON s.product_id = p.id 
        INNER JOIN product_colors as cl ON cl.product_id = p.id 
        LEFT JOIN categories as c ON c.id_categories = p.id 
        WHERE p.category_id = ? AND s.size_id = ? AND cl.color_id = ?`,
        `SELECT * FROM product_sizes`,
        `SELECT * FROM product_colors`,
      ];

      db.query(
        queryStringFilter.join(";"),
        [category, size, color],
        (err, data) => {
          if (!err) {
            resolve(data);
          } else {
            console.log(err);
            reject(err);
          }
        }
      );
    });
  },
};
