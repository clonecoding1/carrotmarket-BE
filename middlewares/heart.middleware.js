const jwt = require("jsonwebtoken");
const env = process.env;

module.exports = (req, res, next) => {
    const { authorization } = req.headers;
    const [tokenType, tokenValue] = (authorization || "").split(" ");
    
    if(tokenType !== "Bearer"){
        res.status(400).json()
    } else {
        const user = jwt.verify(tokenValue, "SECRET_KEY");
        res.locals.userId = user.userId;
    };
    next();

    
};