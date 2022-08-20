const Userservice = require("../services/user.service");

class UserController {
    userService = new Userservice();

    signup = async (req, res, next) => {
        const { email, nickname, password, profile, location } = req.body;
        try {
            const result = await this.userService.signup(email, nickname, password, profile, location);

            return res.status(201).send(result);
        } catch {

        }
    };

    login = async (req, res, next) => {
        const { email, password } = req.body;
        try {
            const token = await this.userService.login(email, password);

            return res.status(201).send(token);
        } catch {

        }
    };

    checkemail = async (req, res, next) => {
        const { email } = req.body;
        try {
            const result = await this.userService.checkemail(email);

            return res.status(200).send(result);
        } catch {

        }
    };

}

module.exports = UserController;
