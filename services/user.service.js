const jwt = require("jsonwebtoken");
const UserRepository = require("../repositories/user.repositoriory");
const bcrypt = require('bcrypt');
const env = process.env;

class UserService {
  userRepository = new UserRepository();

  signup = async (email, nickname, password, profile, location, authorization) => {
    if (authorization) {
      return { status: 401, message: "로그인 되어 있습니다." }
    }
    if (!email || !nickname || !password) {
      return { status: 400, message: "email, nickname, password중에 입력값이 비어 있습니다." }
    }
    if (!profile || !location) {
      return { status: 400, message: "profile, location중에 입력값이 비어 있습니다." }
    }
    const passwords = bcrypt.hashSync(password, 10);
    try {
      await this.userRepository.signup(email, nickname, passwords, profile, location);
    } catch {
      return { status: 400, message: "db생성에 실패했습니다.//email nickname 중복확인 되었나?" }
    }
    return { status: 201, message: "회원가입이 완료되었습니다." }
  };

  login = async (email, password, authorization) => {
    if (authorization) {
      return { status: 401, message: "로그인 되어 있습니다." }
    }
    if (!email || !password) {
      return { status: 400, message: "email, password중에 입력값이 비어 있습니다." }
    }
    const passwords = bcrypt.hashSync(password, 10);
    const userInfo = await this.userRepository.login(email, passwords);
    if (!userInfo) {
      return { status: 400, message: "아이디 혹은 비밀번호가 일치하지 않습니다." }
    } else {
      const isSame = bcrypt.compareSync(password, userInfo.password);
      if (!isSame) {
        return { status: 400, message: "아이디 혹은 비밀번호가 일치하지 않습니다." };
      } else {
        const payload = {
          userId: userInfo.id,
          nickname: userInfo.nickname,
        };//유효 시간 
        const token = jwt.sign(payload, env.SECRET_KEY);
        return { status: 201, dete: token };
      }
    }
  };

  checkemail = async (email) => {
    if (!email) {
      return { status: 400, message: "입력값이 비어 있습니다." }
    }
    const check = await this.userRepository.checkemail(email);
    if (check) {
      return { status: 400, message: "중복된 이메일입니다." };
    } else {
      return { status: 200, message: "사용가능한 이메일 입니다." };
    }
  };

  checknickname = async (nickname) => {
    if (!nickname) {
      return { status: 400, message: "입력값이 비어 있습니다." }
    }
    const check = await this.userRepository.checkemail(nickname);
    if (check) {
      return { status: 400, message: "중복된 닉네임입니다." };
    } else {
      return { status: 200, message: "사용가능한 닉네임 입니다." };
    }
  };

  kakaologin = async (email, nickname, profile, location) => {
    const password = env.KAKAO_PW
    const passwords = bcrypt.hashSync(password, 10);
    const userInfo = await this.userRepository.login(email, passwords);
    if (!userInfo){
      const userInfo = await this.userRepository.kakaosignup(email, nickname, passwords, profile, location)
      const payload = {
        userId: userInfo.id,
        nickname: userInfo.nickname,
      };//유효 시간 
      const token = jwt.sign(payload, env.SECRET_KEY);
      return { status: 201, dete: token };
    }else{
      const payload = {
        userId: userInfo.id,
        nickname: userInfo.nickname,
      };//유효 시간 
      const token = jwt.sign(payload, env.SECRET_KEY);
      return { status: 201, dete: token };
    }
  }
};

module.exports = UserService;