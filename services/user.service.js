const jwt = require("jsonwebtoken");
const UserRepository = require("../repositories/user.repositoriory");
const bcrypt = require('bcrypt');
const {
  UnauthorizedException,
  ForbiddenException,
  ConflictException,
  NotFoundException,
  BadRequestException,
  UnkownException,
} = require("../exceptionhandler/exception.Processing");

class UserService {
    userRepository = new UserRepository();

    signup = async (email, nickname, password, profile, location) => {
        try {
            await this.userRepository.signup(email, nickname, password, profile, location);
            return {message : "회원가입이 완료되었습니다."}
        } catch {
            throw new UnkownException("알 수 없는 오류");
        }
    };

    login = async (email, password) => {
      try {
            const userInfo = await this.userRepository.login(email, password);

            if (userInfo) {
                const isSame = bcrypt.compareSync(password, userInfo.password);
          
                if (isSame) {
                  const payload = {
                    nickname: userInfo.nickname,
                    userId: userInfo.userId,
                    // 기한 정하기
                  };
                  const token = jwt.sign(payload, "SECRET_KEY");
                  return token;
                } else {
                  throw new BadRequestException("사용자 정보가 일치 하지 않습니다.");
                }
                  
            } else {
              throw new BadRequestException("사용자 정보가 일치 하지 않습니다.");
            }
      } catch {
        throw new UnkownException("알 수 없는 오류");
      }
    };

    checkemail = async (email) => {
        try {
            const check = await this.userRepository.checkemail(email);
            if(check){
              throw new BadRequestException("중복된 이메일입니다.");
            }
        } catch {
          throw new UnkownException("알 수 없는 오류");
        }
    };
    
    checknickname = async (nickname) => {
      try {
        const check = await this.userRepository.checkemail(nickname);
        if(check){
          throw new BadRequestException("중복된 닉네임입니다.");
        }
      } catch {
        throw new UnkownException("알 수 없는 오류");
      }
  };

};

module.exports = UserService;