const authRouter = require("express").Router();
const authController = require("../controllers/auth");
const checkToken = require("../helpers/middlewares/checkToken");

authRouter.post("/register", authController.register);
authRouter.post("/login", authController.login);
authRouter.post("/forgot", authController.forgotEmail);
authRouter.post("/findOTP", authController.checkOTP);
authRouter.patch("/reset", authController.resetPassword);
authRouter.delete("/logout", authController.logout);

authRouter.get('/profile', checkToken, authController.getProfile);
authRouter.put('/profile', checkToken, authController.updateProfile);

module.exports = authRouter;
