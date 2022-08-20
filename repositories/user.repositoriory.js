const { User } = require("../../models");


class UserRepository {


    signup = async (email, nickname, password, profile, location) => {
        try {
            await User.create(email, nickname, password, profile, location);
            
        } catch {

        }
    };

    login = async (email, password) => {
        try {
            await User.findOne({ where: {email, password}});

        } catch {

        }
    };

    checkemail = async (email) => {
        try {
            await User.findOne({ where: {email}});

        } catch {

        }
    };

};

module.exports = UserRepository;