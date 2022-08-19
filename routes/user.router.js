const express = require("express");
const router = express.Router();
const UsersController = require("../controllers/users.controller");
const usersController = new UsersController();

router.post("/signup", usersController);
router.post("/checkemail", usersController);
router.post("/login", usersController);


module.exports = router;