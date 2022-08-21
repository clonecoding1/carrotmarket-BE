const { User } = require("../models");
const { BadRequestException } = require("../exceptionhandler/exception.Processing");

class UserRepository {

    signup = async (email, nickname, password, profile, location) => {
        try {
            await User.create(email, nickname, password, profile, location);
        } catch {
            throw new BadRequestException(`유저정보를 db에 생성에 실패했습니다.`) ;
        }
    };

    login = async (email, password) => {
        try {
            await User.findOne({ where: {email, password}});
        } catch {
            throw new BadRequestException(`유저정보를 db에서 조회실패.`) ;
        }
    };

    checkemail = async (email) => {
        try {
            await User.findOne({ where: {email}});
        } catch {
            throw new BadRequestException(`email를 db에서 조회실패.`) ;
        }
    };

    checknickname = async (nickname) => {
        try {
            await User.findOne({ where: {nickname}});
        } catch {
            throw new BadRequestException(`nickname를 db에서 조회실패.`) ;
        }
    };

};

module.exports = UserRepository;