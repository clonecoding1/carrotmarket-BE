const express = require("express");
const router = express.Router();

const userRouter = require("./user.routes");
const postRouter = require("./post.routes");
const mypageRouter = require("./mypage.routes");

router.use("/user", userRouter);
router.use("/post", postRouter);
router.use("/mypage", mypageRouter);

module.exports = router;
