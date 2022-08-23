const Mypageservice = require("../services/mypage.service");

class MypageController {
    mypageservice = new Mypageservice();

    myinfo = async (req, res, next) => {
        const { userId } = res.locals;
        try {
            const date = await this.mypageservice.myinfo(userId, nickname);
            return res.status(date).json(date);
        } catch {
            return res.status(400).json("알 수 없는 오류");
        }
    }

    Withdrawal = async (req, res, next) => {//이거 위험한데.. 토큰에 로그인 되었으면 관련정보 전부 삭제..
        const { password } = req.body
        const { userId } = res.locals;
        try {
            const date = await this.mypageservice.Withdrawal(userId)
            return res.status(date.status).send(date.message)
        } catch {
            return res.status(400).json("알 수 없는 오류");
        }
    }

}

module.exports = MypageController;
