const { configDotenv } = require("dotenv");
const jwt = require("jsonwebtoken");
const ADMINSECRET = process.env.JWT_ADMIN_SECRET;

function adminMiddelware(req,res,next) {
    const token = req.headers.token;
    const decode = jwt.verify(token,ADMINSECRET);

    if(decode){
        req.adminId = decode.id;
        next();
    } else{
        res.status(403).json({
            message:"You are not signed in"
        })
    }
}

module.exports = {
    adminMiddelware
}