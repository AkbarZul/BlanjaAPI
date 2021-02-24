module.exports = {
  success: (res, data) => {
    const resObject = {
      message: "Data Success",
      status: 200,
      data: data,
    };
    res.json(resObject);
  },

  error: (res, err) => {
    const resObject = {
      message: err,
      // status: 500,
      // error: err
    };
    res.status(500).json(resObject);
  },

  // Kategories response
  nested: (res, data) => {
    let productArray = data[1];
    let categoryArray = data[0];

    console.log("category ", categoryArray[0]);
    console.log("product ", productArray);

    const sortKey = "category_name";
    categoryArray.sort((a, b) => {
      if (a[sortKey] < b[sortKey]) {
        return -1;
      }
      if (a[sortKey] > b[sortKey]) {
        return 1;
      }
      return 0;
    });

    let categories = categoryArray.reduce((map, row) => {
      const key = row["category_name"];
      map[key] = row;
      return map;
    }, {});

    productArray.reduce((map, row) => {
      const key = row["category_name"];
      map[key];
      if (map[key]) {
        if (!map[key].product) map[key].product = [];
        map[key].product.push(row);
      }

      return map;
    }, categories);

    let result = Object.values(categories);
    // let result = categories;

    const resObject = {
      message: "Data Success",
      status: 200,
      data: result[0],
    };
    res.json(resObject);
  },

  // orders response
  nestedAll: (res, data) => {
    let orderDetailArray = data[1];
    let orderArray = data[0];

    let orders = orderArray.reduce((map, row) => {
      const key = row["id"];
      map[key] = row;
      row.order_detail = [];
      return map;
    }, {});

    orderDetailArray.reduce((map, row) => {
      const key = row["order_id"];
      map[key];
      console.log(map[key]);
      if (map[key]) {
        if (!map[key].order_detail) map[key].order_detail = [];
        map[key].order_detail.push(row);
      }

      return map;
    }, orders);

    let result = Object.values(orders);

    result.sort((a, b) => {
      if (a["created_at"] < b["created_at"]) {
        return 1;
      }
      if (a["created_at"] > b["created_at"]) {
        return -1;
      }
      return 0;
    });

    const resObject = {
      message: "Data Success",
      status: 200,
      data: result,
    };
    res.json(resObject);
  },

  // order Detail response
  nestedOne: (res, data) => {
    let orderDetailArray = data[1];
    let orderArray = data[0];

    let orders = orderArray.reduce((map, row) => {
      const key = row["id"];
      console.log("order key = " + key);
      map[key] = row;
      return map;
    }, {});

    orderDetailArray.reduce((map, row) => {
      const key = row["order_id"];
      map[key];
      if (map[key]) {
        if (!map[key].order_detail) map[key].order_detail = [];
        map[key].order_detail.push(row);
      }

      return map;
    }, orders);

    let result = Object.values(orders);

    const resObject = {
      message: "Data Success",
      status: 200,
      data: result[0],
    };
    res.json(resObject);
  },

  nestedAllReview: (res, data) => {
    let productArray = data[0];
    let reviewArray = data[1];

    let products = productArray.reduce((map, row) => {
      const key = row["id"];
      map[key] = row;
      row.review = [];
      return map;
    }, {});

    reviewArray.reduce((map, row) => {
      const key = row["product_id"];
      map[key];
      console.log(!map[key].review);
      if (map[key]) {
        if (!map[key].review) {
          map[key].review = [];
        }
        map[key].review.push(row);
      }
      return map;
    }, products);
    let result = Object.values(products);

    const resObject = {
      message: "Data Success",
      status: 200,
      data: result,
    };
    res.json(resObject);
  },

  nestedReviewById: (res, data) => {
    let productArray = data[0];
    let reviewArray = data[1];
    let ratingArray = data[2];
    let totalUser = [];

    let products = productArray.reduce((map, row) => {
      const key = row["id"];
      let totalUser = [];
      ratingArray.map((rating) => {
        totalUser.push(rating.total_user);
      });

      row.total_user_rating = totalUser.reduce((a, b) => {
        return a + b;
      }, 0);

      map[key] = row;
      row.rating_detail = [];
      row.review = [];

      return map;
    }, {});

    ratingArray.map((rating) => {
      totalUser.push(rating.total_user);
    });

    ratingArray.reduce((map, row) => {
      const key = row["product_id"];
      map[key];
      if (map[key]) {
        if (!map[key].rating_detail) {
          map[key].rating_detail = [];
        }
        map[key].rating_detail.push(row);
      }

      return map;
    }, products);

    reviewArray.reduce((map, row) => {
      const key = row["product_id"];
      map[key];
      if (map[key]) {
        if (!map[key].review) {
          map[key].review = [];
        }
        map[key].review.push(row);
      }
      return map;
    }, products);

    let result = Object.values(products);

    const resObject = {
      message: "Data Success",
      status: 200,
      data: result[0],
    };
    res.json(resObject);
  },

  //nested products
  nestedAllProduct: (res, data, keyword) => {
    let productArray = data.products[0];
    // console.log(productArray);
    let sizeArray = data.products[1];
    let colorArray = data.products[2];

    console.log();

    let products = productArray.reduce((map, row) => {
      // console.log(row.rating);
      const key = row["id"];
      map[key] = row;
      row.sizes = [];
      row.colors = [];
      return map;
    }, {});

    console.log(products);

    sizeArray.reduce((map, row) => {
      const key = row["product_id"];
      map[key];
      if (map[key]) {
        if (!map[key].sizes) map[key].sizes = [];
        map[key].sizes.push(row);
      }
      return map;
    }, products);

    colorArray.reduce((map, row) => {
      const key = row["product_id"];
      map[key];
      if (map[key]) {
        if (!map[key].colors) map[key].colors = [];
        map[key].colors.push(row);
      }
      return map;
    }, products);
    let result = Object.values(products);
    
    let newKeyword = keyword.split(' ');

    if(newKeyword[1] === 'DESC'){
      result.sort((a,b) => {
        if (a[newKeyword[0]] < b[newKeyword[0]]) {
          return 1;
        }
        if (a[newKeyword[0]] > b[newKeyword[0]]) {
          return -1;
        }
        return 0;
      })
    }else{
      result.sort((a,b) => {
        if (a[newKeyword[0]] < b[newKeyword[0]]) {
          return -1;
        }
        if (a[newKeyword[0]] > b[newKeyword[0]]) {
          return 1;
        }
        return 0;
      })
    }

    let newResult = {
      products: result,
      pageInfo: data.pageInfo,
    };

    const resObject = {
      message: "Data Success",
      status: 200,
      data: newResult,
    };

    res.json(resObject);
  },

  nestedProductById: (res, data) => {
    let productArray = data[0];
    let sizeArray = data[1];
    let colorArray = data[2];
    let ratingArray = data[3];

    let products = productArray.reduce((map, row) => {
      const key = row["id"];
      map[key] = row;
      row.rating = 0;
      row.sizes = [];
      row.colors = [];
      return map;
    }, {});

    sizeArray.reduce((map, row) => {
      const key = row["product_id"];
      map[key];
      if (map[key]) {
        if (!map[key].sizes) map[key].sizes = [];
        map[key].sizes.push(row);
      }
      return map;
    }, products);

    colorArray.reduce((map, row) => {
      const key = row["product_id"];
      map[key];
      if (map[key]) {
        if (!map[key].colors) map[key].colors = [];
        map[key].colors.push(row);
      }
      return map;
    }, products);

    ratingArray.reduce((map, row) => {
      const key = row["product_id"];
      map[key];
      if (map[key]) {
        if (!map[key].rating) map[key].rating = 0;
        map[key].rating = row["rating"];
      }
      return map;
    }, products);

    let result = Object.values(products);

    const resObject = {
      message: "Data Success",
      status: 200,
      data: result[0],
    };

    res.json(resObject);
  },

  nestedProductByUser: (res, data) => {
    let productArray = data[0];
    let sizeArray = data[1];
    let colorArray = data[2];
    let ratingArray = data[3];

    let products = productArray.reduce((map, row) => {
      const key = row["id"];
      map[key] = row;
      row.rating = 0;
      row.sizes = [];
      row.colors = [];
      return map;
    }, {});

    sizeArray.reduce((map, row) => {
      const key = row["product_id"];
      map[key];
      if (map[key]) {
        if (!map[key].sizes) map[key].sizes = [];
        map[key].sizes.push(row);
      }
      return map;
    }, products);

    colorArray.reduce((map, row) => {
      const key = row["product_id"];
      map[key];
      if (map[key]) {
        if (!map[key].colors) map[key].colors = [];
        map[key].colors.push(row);
      }
      return map;
    }, products);

    ratingArray.reduce((map, row) => {
      const key = row["product_id"];
      map[key];
      if (map[key]) {
        if (!map[key].rating) map[key].rating = 0;
        map[key].rating = row["rating"];
      }
      return map;
    }, products);

    let result = Object.values(products);

    const resObject = {
      message: "Data Success",
      status: 200,
      data: result,
    };

    res.json(resObject);
  },

  nestedFilterProduct: (res, data) => {
    let productArray = data[0];
    let sizeArray = data[1];
    let colorArray = data[2];
    let ratingArray = data[3];

    let products = productArray.reduce((map, row) => {
      const key = row["id"];
      map[key] = row;
      row.sizes = [];
      row.colors = [];
      row.rating = 0;
      return map;
    }, {});

    sizeArray.reduce((map, row) => {
      const key = row["product_id"];
      map[key];
      if (map[key]) {
        if (!map[key].sizes) map[key].sizes = [];
        map[key].sizes.push(row);
      }
      return map;
    }, products);

    colorArray.reduce((map, row) => {
      const key = row["product_id"];
      map[key];
      if (map[key]) {
        if (!map[key].colors) map[key].colors = [];
        map[key].colors.push(row);
      }
      return map;
    }, products);

    ratingArray.reduce((map, row) => {
      const key = row["product_id"];
      map[key];
      if (map[key]) {
        if (!map[key].rating) map[key].rating = 0;
        map[key].rating = row["rating"];
      }
      return map;
    }, products);
    
    let result = Object.values(products);

    const resObject = {
      message: "Data Success",
      status: 200,
      data: result,
    };

    res.json(resObject);
  },

  nestedReviewByProductId: (res, data) => {
    let productArray = data[0];
    let reviewArray = data[1];
    let ratingArray = data[2];
    let totalUser = [];

    let products = productArray.reduce((map, row) => {
      const key = row["id"];
      let totalUser = [];
      ratingArray.map((rating) => {
        totalUser.push(rating.total_user);
      });

      row.total_user_rating = totalUser.reduce((a, b) => {
        return a + b;
      }, 0);

      map[key] = row;
      row.rating_detail = [];
      row.review = [];

      return map;
    }, {});

    ratingArray.map((rating) => {
      totalUser.push(rating.total_user);
    });

    ratingArray.reduce((map, row) => {
      const key = row["product_id"];
      map[key];
      if (map[key]) {
        if (!map[key].rating_detail) {
          map[key].rating_detail = [];
        }
        map[key].rating_detail.push(row);
      }

      return map;
    }, products);

    reviewArray.reduce((map, row) => {
      const key = row["product_id"];
      map[key];
      if (map[key]) {
        if (!map[key].review) {
          map[key].review = [];
        }
        map[key].review.push(row);
      }
      return map;
    }, products);

    let result = Object.values(products);

    const resObject = {
      message: "Data Success",
      status: 200,
      data: result[0],
    };
    res.json(resObject);
  },
};
