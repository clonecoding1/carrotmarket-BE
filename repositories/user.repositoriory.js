const { User } = require("../models");

class UserRepository {

    signup = async (email, nickname, passwords, profile, location) => {
        await User.create({ email, nickname, password: passwords, profile, location });
    };

    login = async (email) => {
        return await User.findOne({ where: { email } });
    };

    checkemail = async (email) => {
        return await User.findOne({ where: { email } });
    };

    checknickname = async (nickname) => {
        return await User.findOne({ where: { nickname } });
    };

};

module.exports = UserRepository;