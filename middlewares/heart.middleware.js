const jwt = require("jsonwebtoken");
const env = process.env;

module.exports = (req, res, next) => {
    const { authorization } = req.headers;
    const [tokenType, tokenValue] = (authorization || "").split(" ");
    
    if(tokenType !== "Bearer"){
        res.send({message:"비회원입니다"})
    } else {
        const user = jwt.verify(tokenValue, "market");
        res.locals.userId = user.userId;
        res.locals.nickname = user.nickname;
    };
    next();

    
};