const express = require("express");
const router = express.Router();
const UserController = require("../controllers/user.controller");
const userController = new UserController();

router.post("/signup", userController);
router.post("/checkemail", userController);
router.post("/login", userController);


module.exports = router;