const { User } = require("../models");

class UserRepository {

    signup = async (email, nickname, passwords, profile, location) => {
            await User.create({email, nickname, password:passwords, profile, location});
    };

    login = async (email) => {
        try {
            const user = await User.findOne({ where: {email}});
            return user
        } catch {
            throw Error ({message : "유저정보를 db에서 조회실패."}) ;
        }
    };

    checkemail = async (email) => {
        try {
            const check = await User.findOne({ where: {email}});
            return check
        } catch {
            throw Error(`email를 db에서 조회실패.`) ;
        }
    };

    checknickname = async (nickname) => {
        try {
            const check = await User.findOne({ where: {nickname}});
            return check
        } catch {
            throw Error(`nickname를 db에서 조회실패.`) ;
        }
    };

};

module.exports = UserRepository;