const {Router, request} = require("express");
const {courseSchema} = require('../db')
const courseRouter = Router();
const { usermiddelware }= require("../middelware/user")

courseRouter.post("/",usermiddelware, async(req, res) => {
    
    res.json({
        message:"courses endpoint"
    })
})
courseRouter.get("/",usermiddelware, async (req,res) => {
    res.json({
        message:"preview endpoint"
    })
});

module.exports = {
    courseRouter:courseRouter
}