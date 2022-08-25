const express = require("express");
const router = express.Router();
const auth = require("../middlewares/Auth.middleware")
const MypageController = require("../controllers/mypage.controller");
const mypageController = new MypageController();

router.use(auth)
router.get("/", mypageController.myinfo);
router.get("/mypage", mypageController.mypage);
router.get("/likelist", mypageController.likelist);
router.delete("/mypage", mypageController.Withdrawal);
router.post("/like/:postId", mypageController.like);

module.exports = router;