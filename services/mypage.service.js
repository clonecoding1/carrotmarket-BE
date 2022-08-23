const MypageRepository = require("../repositories/mypage.repositoriory");


class MypageService {
    mypageRepository = new MypageRepository();
    
    myinfo = async ( userId ) => {
        const userdate = await this.mypageRepository.myinfo( userId )
        const postlist = await this.mypageRepository.mypagelest( userId )
    }

    Withdrawal = async ( userId ) => {
        try {
            const date = await this.mypageRepository.myinfo( userId )
            if(!date){
                return {status:400, message:"이미 없는 아이디 입니다."}
            }
        } catch {
            return {status:400, message:"db에서 회원정보 조회중 오류"}
        }
        await this.mypageRepository.Withdrawal( userId )
        return {status:200, message:"회원 가입 탈퇴"}
    }

};

module.exports = MypageService;