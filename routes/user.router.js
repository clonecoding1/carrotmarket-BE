const express = require("express");
const router = express.Router();
const signupmiddleware = require("../middlewares/singup.middleware")
const UserController = require("../controllers/user.controller");
const userController = new UserController();

router.post("/signup", signupmiddleware, userController.signup);
router.post("/login", signupmiddleware, userController.login);
router.post("/checkemail", userController.checkemail);
router.post("/checknickname", userController.checknickname);
router.post("/kakao", userController.kakaologin);

module.exports = router;