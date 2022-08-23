const express = require("express");
const router = express.Router();

const signRoter = require("./user.router");
const mypageRouter = require("./mypage.router");
const postRouter = require("./post.router");

router.use("/api", router);
router.use("/user", signRoter);
router.use("/user", mypageRouter);
router.use("/post", postRouter);

module.exports = router;