const Mypageservice = require("../services/mypage.service");

class MypageController {
    mypageservice = new Mypageservice();

    myinfo = async (req, res, next) => {
        const { userId } = res.locals;
        try {
            const date = await this.mypageservice.myinfo(userId);
            if(date.status==200){
                return res.status(date.status).json(date.dete)
            }
            return res.status(date.status).send(date.message)//에러처리 할게 없으면 삭제
        } catch {
            return res.status(400).json("알 수 없는 오류");
        }
    }

    mypage = async (req, res, next) => {
        const { userId } = res.locals;
        try {
            const date = await this.mypageservice.mypage(userId);
            if(date.status==200){
                return res.status(date.status).json(date.mypage)
            }
            return res.status(date.status).send(date.message)
        } catch {
            return res.status(400).json("알 수 없는 오류");
        }
    }

    likelist = async (req, res, next) => {
        const { userId } = res.locals;
        try {
            const date = await this.mypageservice.likelist(userId);
            if(date.status==200){
                return res.status(date.status).json(date.likelist)
            }
            return res.status(date.status).send(date.message)
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

    like = async (req, res, next) => {
        const { postId } = req.params;
        const { userId } = res.locals;
        try {
            const date = await this.mypageservice.like(postId, userId)
            return res.status(date.status).send(date.message)
        } catch {
            return res.status(400).json("알 수 없는 오류");
        }
    }

}

module.exports = MypageController;
