// const addressModel = require("../models/address");
// const form = require("../helpers/form");

// module.exports = {
//   postAddress: (req, res) => {
//     const { body } = req;
//     const user_id = req.decodedToken.id;
//     const insertBody = {
//       ...body,
//       user_id: user_id,
//     };
//     addressModel
//       .postAddress(insertBody, user_id)
//       .then((data) => {
//         const newResObj = {
//           id: data.insertId,
//           ...insertBody,
//         };
//         form.success(res, newResObj);
//       })
//       .catch((err) => {
//         form.error(res, err);
//       });
//   },

//   updateAddress: (req, res) => {
//     const { body } = req;
//     const { id } = req.params;
//     const insertBody = {
//       ...body,
//     };
//     addressModel
//       .updateAddress(insertBody, update, idUser)
//       .then((data) => {
//         if (data.affectedRows === 0) {
//           res.status(404).json({
//             msg: "data not found",
//             status: 404,
//           });
//         } else {
//           const newResObj = {
//             id: idUser,
//             ...insertBody,
//           };
//           form.success(res, newResObj);
//         }
//       })
//       .catch((err) => {
//         form.error(res, err);
//       });
//   },

//   getAddressByUserId: (req, res) => {
//     // const { id } = req.params;
//     const user_id = req.decodedToken.id;
//     addressModel
//       .getAddressByUserId(user_id)
//       .then((data) => {
//         console.log(data);
//         form.success(res, data);
//       })
//       .catch((err) => {
//         form.error(res, err);
//       });
//   },
// };

const addressModel = require("../models/address");
const form = require("../helpers/form");

module.exports = {
  addAddress: (req, res) => {
    const { body } = req;
    const user_id = req.decodedToken.id;
    const insertBody = {
      ...body,
      id_user: user_id,
    };
    addressModel
      .addAddress(insertBody, user_id)
      .then((data) => {
        const newResObj = {
          id: data.insertId,
          ...insertBody,
        };
        form.success(res, newResObj);
      })
      .catch((err) => {
        form.error(res, err);
      });
  },

  getAddressByUser: (req, res) => {
    const user_id = req.decodedToken.id;
    addressModel
      .getAddressByUser(user_id)
      .then((data) => {
        form.success(res, data);
      })
      .catch((err) => {
        form.error(res, err);
      });
  },

  // getAddressById: (req, res) => {
  //   const user_id = req.decodedToken.id;
  //   addressModel
  //     .getAddressById(user_id)
  //     .then((data) => {
  //       form.success(res, data);
  //     })
  //     .catch((err) => {
  //       form.error(res, err);
  //     });
  // },

  updateAddress: (req, res) => {
    const { body } = req;
    const { id } = req.params;
    const user_id = req.decodedToken.id
    const insertBody = {
      ...body,
    };
    addressModel
      .updateAddress(insertBody, id, res, user_id)
      .then((data) => {
        if (data.affectedRows === 0) {
          res.status(404).json({
            msg: "data not found",
            status: 404,
          });
        } else {
          const newResObj = {
            id: user_id,
            ...insertBody,
          };
          form.success(res, newResObj);
        }
      })
      .catch((err) => {
        form.error(res, err);
      });
  },

  deleteAddress: (req, res) => {
    const { id } = req.params;
    const user_id = req.decodedToken.id
    addressModel.deleteAddress(id, user_id)
    .then((data) => {
      if (data.affectedRows === 0) {
        res.status(404).json({
          msg: "Data not found",
          status: 404,
        })
      } else {
        const newResObj = {
          msg: " Data deleted",
          status: 200,
        }
        res.json(newResObj);
      }
    })
    .catch((err) => {
      form.error(res, err);
    })
  }
};

