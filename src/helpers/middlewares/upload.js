const multer = require("multer");
const path = require("path");

const form = require("../form");

const multerStorage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, "./public/images");
    },
    filename: function (req, file, cb) {
      const nameFormat = `${Date.now()}-${file.fieldname}${path.extname(
        file.originalname
      )}`;
      cb(null, nameFormat);
    },
  });

  const upload = multer({
    storage: multerStorage,
    limits: 2 * 1000 * 1000, // 2 MB
  });
  
  const singleUpload = (req, res, next) => {
    const uploadSingle = upload.single("image");
    uploadSingle(req, res, (err) => {
      if (err) {
        form.error(res, {
          msg: "Multer Error",
          err,
        });
      } else {
        next();
      }
    });
  };
  
  module.exports = singleUpload;