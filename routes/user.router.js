const express = require("express");
const router = express.Router();
const signupmiddleware = require("../middlewares/singup.middleware")
const UserController = require("../controllers/user.controller");
const userController = new UserController();

// router.use(signupmiddleware);
router.post("/signup", userController.signup);
router.post("/checkemail", userController.checkemail);
router.post("/checknickname", userController.checknickname);
router.post("/login", userController.login);


module.exports = router;