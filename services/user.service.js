const jwt = require("jsonwebtoken");
const UserRepository = require("../repositories/user.repositoriory");


class UserService {
    userRepository = new UserRepository();

    signup = async (email, nickname, password, profile, location) => {
        try {
            await this.userRepository.signup(email, nickname, password, profile, location);

        } catch {

        }
    };

    login = async (email, password) => {
      try {
            const userInfo = await this.userRepository.login(email, password);

            if (userInfo) {
                // const SECRET_KEY = process.env.SECRET_KEY;
                const isSame = bcrypt.compareSync(password, userInfo.password);
          
                if (isSame) {
                  const payload = {
                    nickname: userInfo.nickname,
                    userId: userInfo.userId,
                    // 기한 정하기
                  };
                  const token = jwt.sign(payload, SECRET_KEY);
                  return token;
                } else
                  throw new UnauthorizedException("사용자 정보가 일치 하지 않습니다.");
              } else throw new UnauthorizedException("사용자 정보가 일치 하지 않습니다.");
          
      } catch {

      }
    };

    checkemail = async (email) => {
        try {
            await this.userRepository.checkemail(email);

        } catch {

        }
    };

};

module.exports = UserService;