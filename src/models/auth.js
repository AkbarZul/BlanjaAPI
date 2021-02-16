const db = require("../config/mySQL");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const otp = require("otp-generator");
const nodemailer = require("nodemailer");

module.exports = {
  postNewUser: (body) => {
    return new Promise((resolve, reject) => {
      const email = body.email;
      const queryCheckEmail = "SELECT email FROM users WHERE email=?";
      db.query(queryCheckEmail, email, (err, data) => {
        if (!data[0]) {
          const saltRounds = 10;
          bcrypt.genSalt(saltRounds, (err, salt) => {
            if (err) {
              reject(err);
            }
            bcrypt.hash(body.password, salt, (err, hashedPassword) => {
              if (err) {
                reject(err);
              }
              const newBody = {
                ...body,
                password: hashedPassword,
              };
              const queryString = "INSERT INTO users SET ?";
              db.query(queryString, newBody, (err, data) => {
                if (!err) {
                  resolve(data);
                } else {
                  reject(err);
                }
              });
            });
          });
        } else {
          reject({
            message: "Email is already exists!",
            status: 403,
          });
        }
      });
    });
  },

  postLogin: (body) => {
    return new Promise((resolve, reject) => {
      const { email, password } = body;
      const queryString =
        "SELECT id, level_id, email, full_name, password FROM users where email = ?";
      db.query(queryString, email, (err, data) => {
        if (err) {
          reject({
            msg: "Error SQL",
            status: 500,
            err,
          });
        }
        // Handle User Not Found","
        if (!data[0]) {
          reject({
            msg: "User Not Found",
            status: 404,
          });
        } else {
          // console.log(data);
          bcrypt.compare(password, data[0].password, (err, result) => {
            if (err) {
              reject({
                msg: "Hash Error",
                status: 500,
                err,
              });
            }
            if (!result) {
              reject({
                msg: "Wrong Password",
                status: 401,
              });
            } else {
              const payload = {
                level_id: data[0].level_id,
                id: data[0].id,
                email: data[0].email,
              };

              const secret = process.env.SECRET_KEY;
              // const token = jwt.sign({email: data[0].email, level_id : data[0].level_id} , secret);
              const token = jwt.sign(payload, secret);
              resolve({
                token,
                full_name: data[0].full_name,
                email: data[0].email,
                user_id: data[0].id,
                level: data[0].level_id,
              });
              console.log(resolve);
            }
          });
        }
      });
    });
  },

  postLogout: (whitelisttoken) => {
    return new Promise((resolve, reject) => {
      const queryString = "DELETE FROM token_whitelist WHERE token=?";
      db.query(queryString, whitelisttoken, (err, data) => {
        if (data.affectedRows === 0) {
          reject({
            status: 404,
            msg: "token tidak ditemukan, login gagal",
          });
        }
        if (!err) {
          resolve({
            msg: `Logout berhasil`,
          });
        } else {
          reject({
            msg: `Logout gagal`,
          });
        }
      });
    });
  },

  // send otp
  forgotPass: (email) => {
    return new Promise((resolve, reject) => {
      const getUser = `SELECT email FROM users WHERE email = ?`;
      db.query(getUser, email, (err, data) => {
        if (!err) {
          if (data[0]) {
            const delOtp = `DELETE FROM otp_reset WHERE email = ?`;
            db.query(delOtp, email, (err, data) => {
              if (!err) {
                const otpCode = otp.generate(6, {
                  alphabets: true,
                  upperCase: true,
                  specialChars: false,
                });
                const dataResend = {
                  email: email,
                  otp: otpCode,
                };
                const queryString = `INSERT INTO otp_reset SET ?`;
                db.query(queryString, dataResend, (err, data) => {
                  if (!err) {
                    let transporter = nodemailer.createTransport({
                      service: "gmail",
                      host: "smtp.gmail.com",
                      port: 578,
                      secure: false,
                      auth: {
                        user: process.env.USER_EMAIL,
                        pass: process.env.PASS_EMAIL,
                      },
                    });
                    let mailOptions = {
                      from: "Blanja Team <blanja@arkademy.mail.com>",
                      to: email,
                      subject: "OTP Code Reset Password",
                      html: ` 
                      <h1> OTP CODE from blanja Team </h1>
                      <p> Hello, this is you OTP code</p>
                      <h2><strong>${otpCode}</strong></h2> 
                      <p> Use it to reset Password </p>
                      `,
                    };
                    transporter.sendMail(mailOptions, (err, data) => {
                      if (err) {
                        console.log("its error: ", err);
                      } else {
                        console.log("success sent");
                        resolve({
                          status: 200,
                          message: `Kode OTP telah dikirim ke email anda`,
                        });
                      }
                    });
                  } else {
                    reject({
                      status: 500,
                      message: `Internal server err`,
                      details: err,
                    });
                  }
                });
              } else {
                reject({
                  status: 404,
                  message: `Email not found`,
                });
              }
            });
          } else {
            reject({
              status: 500,
              message: `Internal server err`,
              details: err,
            });
          }
        }
      });
    });
  },

  //check OTP
  checkOTP: (email, otp) => {
    return new Promise((resolve, reject) => {
      const queryString = `SELECT * FROM otp_reset WHERE email = ? AND otp = ?`;
      db.query(queryString, [email, otp], (err, data) => {
        if (!err) {
          if (data[0]) {
            const qs = `DELETE FROM otp_reset WHERE email = ? and otp = ?`;
            db.query(qs, [email, otp], (err, data) => {
              if (!err) {
                resolve({
                  status: 200,
                  message: `reset your password`,
                  email: email,
                });
              } else {
                reject({
                  status: 500,
                  message: `Internal server error`,
                  details: err,
                });
              }
            });
          } else {
            reject({
              status: 404,
              message: `OTP code not match`,
            });
          }
        } else {
          reject({
            status: 500,
            message: `Internal server error`,
            details: err,
          });
        }
      });
    });
  },

  resetPassword: (body) => {
    return new Promise((resolve, reject) => {
      const saltRounds = Math.floor(Math.random() * 10) + 1;
      bcrypt.hash(body.password, saltRounds, (err, hashedPassword) => {
        const queryString = `UPDATE users SET password = ? WHERE email = ?`;
        db.query(queryString, [hashedPassword, body.email], (err, data) => {
          if (!err) {
            resolve({
              status: 200,
              message: "Password successfully change",
            });
          } else {
            reject({
              status: 500,
              message: "Internal server err",
              details: err,
            });
          }
        });
      });
    });
  },

  getProfile: (id) => {
    return new Promise((resolve, reject) => {
      const queryString = "SELECT * FROM users WHERE id = ?";
      db.query(queryString, id, (err, data) => {
        if (!err) {
          resolve(data);
        } else {
          reject(err);
        }
      });
    });
  },

  updateProfile: (body, id) => {
    return new Promise((resolve, reject) => {
      const { old_password } = body;
      const queryOldPassword = "SELECT password FROM users WHERE id = ?";
      db.query(queryOldPassword, id, (err, data) => {
        if (err) {
          reject({
            msg: "Error SQL",
            status: 500,
            err,
          });
        } else {
          bcrypt.compare(old_password, data[0].password, (err, result) => {
            if (err) {
              reject({
                msg: "Hash Error",
                status: 500,
                err,
              });
            }
            if (!result) {
              reject({
                msg: "Wrong Password",
                status: 401,
              });
            } else {
              const queryUpdateUser = "UPDATE users SET ? WHERE id = ?";
              const { new_password, confirm_new_password } = body;
              if (
                new_password !== undefined ||
                confirm_new_password !== undefined
              ) {
                console.log("Ana Password Anyar");
                if (new_password === confirm_new_password) {
                  const saltRounds = 10;
                  bcrypt.genSalt(saltRounds, (err, salt) => {
                    if (err) {
                      reject(err);
                    }

                    bcrypt.hash(
                      body.new_password,
                      salt,
                      (err, hashedPassword) => {
                        if (err) {
                          reject(err);
                        }
                        delete body.new_password;
                        delete body.confirm_new_password;
                        delete body.old_password;
                        const newBody = {
                          ...body,
                          password: hashedPassword,
                        };
                        db.query(
                          queryUpdateUser,
                          [newBody, id],
                          (err, data) => {
                            if (!err) {
                              resolve({
                                msg: "Update profile is successful",
                                status: 200,
                                data: data,
                              });
                            } else {
                              reject({
                                msg: "Error",
                                status: 500,
                                error: err,
                              });
                            }
                          }
                        );
                      }
                    );
                  });
                } else {
                  reject({
                    msg: "Passwort isn't same",
                    status: 401,
                  });
                }
              } else {
                delete body.old_password;
                const newBody = {
                  ...body,
                };
                db.query(queryUpdateUser, [newBody, id], (err, data) => {
                  if (!err) {
                    resolve({
                      msg: "Update profile is successful",
                      status: 200,
                      data: data,
                    });
                  } else {
                    reject({
                      msg: "Error",
                      status: 500,
                      error: err,
                    });
                  }
                });
              }

              // console.log(password);
            }
          });
        }
      });
    });
  },
};
