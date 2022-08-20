const express = require("express");
const router = express.Router();

const userRouter = require("./user.router");
const postRouter = require("./post.router");
const mypageRouter = require("./mypage.router");

router.use("/user", userRouter);
router.use("/post", postRouter);
router.use("/mypage", mypageRouter);

module.exports = router;
