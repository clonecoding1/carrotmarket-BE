const MypageService = require("../services/mypage.service");
module.exports = class MypageController {
  mypageService = new MypageService();
};
