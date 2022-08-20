const MypageRepository = require("../repositories/mypage.repository");

module.exports = class MypageService {
  mypageRepository = new MypageRepository();
};
