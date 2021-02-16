const authModel = require("../models/auth");
const form = require("../helpers/form");
const db = require("../config/mySQL");

async function whiteListToken(token) {
  await db.query("INSERT INTO token_whitelist SET token=?", token);
}

module.exports = {
  register: (req, res) => {
    const { body } = req;
    authModel
      .postNewUser(body)
      .then(() => {
        form.success(res, {
          msg: "Register Berhasil",
          userData: {
            username: body.username,
          },
        });
      })
      .catch((err) => {
        res.status(403).send(err);
      });
  },

  login: (req, res) => {
    const { body } = req;
    authModel
      .postLogin(body)
      .then(async (data) => {
        await whiteListToken(data.token);
        // console.log(data);
        form.success(res, data);
      })
      .catch((err) => {
        form.error(res, err);
      });
  },

  logout: (req, res) => {
    const bearerToken = req.header("x-access-token");
    if (!bearerToken) {
      res.json({
        msg: `token null`,
      });
    } else {
      const token = bearerToken.split(" ")[1];

      authModel
        .postLogout(token)
        .then((result) => {
          form.success(res, result);
        })
        .catch((err) => {
          form.error(res, err);
        });
    }
  },

  forgotEmail: (req, res) => {
    const { email } = req.body;
    authModel
      .forgotPass(email)
      .then((result) => {
        form.success(res, result);
      })
      .catch((err) => {
        form.error(res, err);
      });
  },

  checkOTP: (req, res) => {
    const { email, otp } = req.body;
    authModel
      .checkOTP(email, otp)
      .then((result) => {
        form.success(res, result);
      })
      .catch((err) => {
        form.error(res, err);
      });
  },

  resetPassword: (req, res) => {
    const { body } = req;
    authModel
      .resetPassword(body)
      .then((result) => {
        form.success(res, result);
      })
      .catch((err) => {
        form.error(res, err);
      });
  },

  getProfile: (req, res) => {
    const { id } = req.decodedToken;
    authModel
      .getProfile(id)
      .then((data) => {
        delete data[0].password;
        delete data[0].level_id;
        form.success(res, data);
      })
      .catch((err) => {
        form.error(res, err);
      });
  },

  updateProfile: (req, res) => {
    const { body } = req;
    const { id } = req.decodedToken;

    console.log('BODY ', body);
    console.log('ID ', id);
    authModel
    .updateProfile(body, id)
    .then((data) => {
      form.success(res, data);
    })
    .catch((err) => {
      form.error(res, err);
    })
  },
};
