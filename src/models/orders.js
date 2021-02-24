const db = require("../config/mySQL");

module.exports = {
  getAllOrdersHistory: (level, user_id) => {
    return new Promise((resolve, reject) => {
      const queryString = [
        // "SELECT * FROM orders WHERE user_id =" + user_id,
        `SELECT o.id, o.transaction_code, o.total, o.user_id, ac.address, o.status_order, o.created_at, o.updated_at FROM orders as o 
        INNER JOIN address_customer as ac ON o.id_address = ac.id_address
        WHERE o.user_id =${user_id} ORDER BY o.created_at DESC`,
        "SELECT od.order_id, p.product_name, c.category_name, cd.conditions, st.name, od.product_qty, od.sub_total_item FROM order_details as od INNER JOIN products as p ON od.product_id = p.id INNER JOIN categories as c ON p.category_id = c.id_categories  INNER JOIN conditions as cd ON p.condition_id = cd.id INNER JOIN status_product as st ON p.status_product_id = st.id ",
      ];
      db.query(queryString.join(";"), (err, data) => {
        if (!err) {
          resolve(data);
        } else {
          console.log(err);
          reject(err);
        }
      });
    });
  },

  getOrderById: (order_id, user_id) => {
    return new Promise((resolve, reject) => {
      const queryString = [
        `SELECT o.id, o.transaction_code, o.total, o.user_id, ac.address, o.status_order, o.created_at, o.updated_at FROM orders as o 
        INNER JOIN address_customer as ac ON o.id_address = ac.id_address
        WHERE o.id=${order_id} AND o.user_id =${user_id}`,
        `SELECT od.order_id, p.id as product_id, p.product_name, c.category_name, cd.conditions, st.name, od.product_qty, od.sub_total_item, p.product_photo FROM order_details as od INNER JOIN products as p ON od.product_id = p.id INNER JOIN categories as c ON p.category_id = c.id_categories INNER JOIN conditions as cd ON p.condition_id = cd.id INNER JOIN status_product as st ON p.status_product_id = st.id WHERE order_id=${order_id}`,
      ];
      db.query(queryString.join(";"), (err, data) => {
        if (!err) {
          resolve(data);
        } else {
          console.log(err);
          reject(err);
        }
      });
    });
  },

  postOrders: (body, level, user_id) => {
    const total = body.item.map((data) => {
      return data.sub_total_item;
    });

    const newTotal = total.reduce((a, b) => {
      return a + b;
    });

    const bodyOrder = {
      transaction_code: body.transaction_code,
      id_address: body.id_address,
      total: newTotal,
      user_id: user_id,
      seller_id: body.seller_id,
      // level: level
    };

    return new Promise((resolve, reject) => {
      if (level !== 1) {
        reject({
          msg: "your level is not match to create orders",
          status: 401,
        });
      } else {
        const queryString = "INSERT INTO orders SET ?";
        db.query(queryString, [bodyOrder], (err, data) => {
          // console.log('anjim ', bodyOrder);
          const queryOrderDetails = "INSERT INTO order_details SET ?";
          body.item.map((results) => {
            const dataOrderDetail = {
              ...results,
              order_id: data.insertId,
            };
            db.query(queryOrderDetails, dataOrderDetail);
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

  getAllOrderHistorySeller: (user_id) => {
    return new Promise((resolve, reject) => {
      const queryString = [
        // "SELECT * FROM orders WHERE user_id =" + user_id,
        `SELECT o.id, o.transaction_code, o.total, o.user_id, ac.address, o.status_order, o.created_at, o.updated_at FROM orders as o 
        INNER JOIN address_customer as ac ON o.id_address = ac.id_address
        WHERE o.seller_id =${user_id}`,
        "SELECT od.order_id, p.product_name, c.category_name, cd.conditions, st.name, od.product_qty, od.sub_total_item, p.product_photo FROM order_details as od INNER JOIN products as p ON od.product_id = p.id INNER JOIN categories as c ON p.category_id = c.id_categories  INNER JOIN conditions as cd ON p.condition_id = cd.id INNER JOIN status_product as st ON p.status_product_id = st.id ",
      ];
      db.query(queryString.join(";"), (err, data) => {
        if (!err) {
          resolve(data);
        } else {
          console.log(err);
          reject(err);
        }
      });
    });
  },

  updateStatusOrder: (order_id, body, level) => {
    return new Promise((resolve, reject) => {
      if(level !== 2 ){
        reject({
          msg: "your level is not match to create orders",
          status: 401,
        });
      }else{
        const queryString = "UPDATE orders SET ? WHERE id =?";

      db.query(queryString, [body ,order_id], (err, data) => {
        if(!err){
          resolve({
            msg: "Update status is successfully",
            status: 200,
            data : data
          });
        }else{
          reject({
            msg: "Update status is failed",
            status: 500
          });
        }
      });
      }
    });
  },
};
