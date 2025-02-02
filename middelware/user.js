const { configDotenv } = require("dotenv");
const jwt = require("jsonwebtoken");
const user = require("../Router/user");
const USERSECRET = process.env.JWT_USER_SECRET;

function usermiddelware(req,res,next) {
    const token = req.headers.token;
    const decode = jwt.verify(token,USERSECRET);

    if(decode){
        req.userId = decode.id;
        next();
    } else{
        res.status(403).json({
            message:"You are not signed in"
        })
    }
}

module.exports = {
    usermiddelware
}