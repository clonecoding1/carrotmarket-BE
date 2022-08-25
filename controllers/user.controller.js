const Userservice = require("../services/user.service");

class UserController {
    userService = new Userservice();

    signup = async (req, res, next) => {
        const { email, nickname, password, profile, location } = req.body;
        const { authorization } = req.headers;
        try {
            const result = await this.userService.signup(email, nickname, password, profile, location, authorization);
            return res.status(result.status).send(result.message);
        } catch {
            return res.status(400).json("알 수 없는 오류");
        }
    };

    login = async (req, res, next) => {
        const { email, password } = req.body;
        const { authorization } = req.headers;
        try {
            const result = await this.userService.login(email, password, authorization);
            if (result.status === 201) {
                return res.status(result.status).json(result.dete);
            }
            return res.status(result.status).json(result.message);
        } catch {
            return res.status(400).json("알 수 없는 오류");
        }
    };

    checkemail = async (req, res, next) => {
        const { email } = req.body;
        try {
            const result = await this.userService.checkemail(email);

            return res.status(result.status).json(result.message);
        } catch {
            return res.status(400).json("알 수 없는 오류");
        }
    };

    checknickname = async (req, res, next) => {
        const { nickname } = req.body;
        try {
            const result = await this.userService.checkemail(nickname);

            return res.status(result.status).json(result.message);
        } catch {
            return res.status(400).json("알 수 없는 오류");
        }
    };

    kakaologin = async (req, res, next) => {
        const { email, nickname, profile, location } = req.body;
        console.log(email, nickname, profile, location)
        try {
            const result = await this.userService.kakaologin(email, nickname, profile, location);
            if (result.status === 201) {
                return res.status(result.status).json(result.dete);
            }
            return res.status(result.status).send(result.message);
        } catch {
            return res.status(400).json("알 수 없는 오류");
        }
    };
}

module.exports = UserController;
