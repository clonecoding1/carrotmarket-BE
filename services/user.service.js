const jwt = require("jsonwebtoken");
const UserRepository = require("../repositories/user.repositoriory");
const bcrypt = require('bcrypt');

class UserService {
    userRepository = new UserRepository();

    signup = async (email, nickname, password, profile, location) => {
        const passwords = await bcrypt.hashSync(password, 10);// 암호화하기
        await this.userRepository.signup(email, nickname, passwords, profile, location);
        return {message : "회원가입이 완료되었습니다."}
    };

    login = async (email, password) => {
        const userInfo = await this.userRepository.login(email);
        if (userInfo) {
            const isSame = bcrypt.compareSync(password, userInfo.password);
            if (isSame) {
              const payload = {
                userId: userInfo.id,
                nickname: userInfo.nickname,
              };
              const token = jwt.sign(payload, "SECRET_KEY");
              return token;
            } else {
              throw Error("아이디 혹은 비밀번호가 일치하지 않습니다");
            }
        } else {
          throw Error("아이디 혹은 비밀번호가 일치하지 않습니다");
        }
    };

    checkemail = async (email) => {
        const check = await this.userRepository.checkemail(email);
        if(check){
          throw Error("중복된 이메일입니다.");
        }else{
          return {message : "사용가능한 이메일 입니다."}
        }
    };
    
    checknickname = async (nickname) => {
        const check = await this.userRepository.checkemail(nickname);
        if(check){
          throw Error("중복된 닉네임입니다.");
        }else{
          return {message : "사용가능한 닉네임 입니다."}
        }
  };

};

module.exports = UserService;