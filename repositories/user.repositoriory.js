const { User } = require("../models");

class UserRepository {

    signup = async (email, nickname, passwords, profile, location) => {
        await User.create({ email, nickname, password: passwords, profile, location });
    };

    login = async (email, passwords) => {
        return await User.findOne({ where: { email, password: passwords } });
    };

    checkemail = async (email) => {
        return await User.findOne({ where: { email } });
    };

    checknickname = async (nickname) => {
        return await User.findOne({ where: { nickname } });
    };

    kakaosignup = async (email, nickname, passwords, profile, location) => {
        await User.create({ email, nickname, password: passwords, profile, location });
        return await User.findOne({ where: { email, password: passwords } });
    }
};

module.exports = UserRepository;