const Userservice = require("../services/user.service");
const exceptionHandler = require("../errorhandler/exception.handler");

class UserController {
    userService = new Userservice();

    signup = async (req, res, next) => {
        const { email, nickname, password, profile, location } = req.body;
        try {
            const result = await this.userService.signup(email, nickname, password, profile, location);

            return res.status(201).send(result);
        } catch {
            const exception = exceptionHandler(err);

            return res.status(exception.statusCode).json(exception.message);
        }
    };

    login = async (req, res, next) => {
        const { email, password } = req.body;
        try {
            const token = await this.userService.login(email, password);

            return res.status(201).json(token);
        } catch {
            const exception = exceptionHandler(err);

            return res.status(exception.statusCode).json(exception.message);
        }
    };

    checkemail = async (req, res, next) => {
        const { email } = req.body;
        try {
            const result = await this.userService.checkemail(email);

            return res.status(200).send(result);
        } catch {
            const exception = exceptionHandler(err);

            return res.status(exception.statusCode).json(exception.message);
        }
    };
    
    checknickname = async (req, res, next) => {
        const { nickname } = req.body;
        try {
            const result = await this.userService.checkemail(nickname);

            return res.status(200).send(result);
        } catch {
            const exception = exceptionHandler(err);

            return res.status(exception.statusCode).json(exception.message);
        }
    };


}

module.exports = UserController;
