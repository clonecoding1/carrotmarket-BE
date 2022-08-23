const express = require("express");
const router = express.Router();
const auth = require("../middlewares/Auth.middleware")
const MypageController = require("../controllers/mypage.controller");
const mypageController = new MypageController();

router.use(auth)
router.get("/mypage", mypageController.myinfo);
router.delete("/mypage", mypageController.Withdrawal);




module.exports = router;