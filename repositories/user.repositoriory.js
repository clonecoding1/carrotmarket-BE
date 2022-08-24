const { User } = require("../models");

class UserRepository {

    signup = async (email, nickname, passwords, profile, location) => {
        await User.create({ email, nickname, password: passwords, profile, location, kakao:"folse" });
    };

    login = async (email) => {
        return await User.findOne({ where: { email, kakao:"folse" } });
    };

    checkemail = async (email) => {
        return await User.findOne({ where: { email } });
    };

    checknickname = async (nickname) => {
        return await User.findOne({ where: { nickname } });
    };

    kakaologin = async (email, password) => {
        return await User.findOne({ where: { email, password, kakao:"true" } });
    };

    kakaosignup = async (email, nickname, password, profile, location) => {
        await User.create({ email, nickname, password, profile, location, kakao:"true" });
        return await User.findOne({ where: { email, password, kakao:"true" } });
    }
};

module.exports = UserRepository;