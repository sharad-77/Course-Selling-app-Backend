const {Router} = require("express");
const {courseSchema} = require('../db')
const courseRouter = Router();

courseRouter.post("/", async(req, res) => {
    res.json({
        message:"courses endpoint"
    })
})
courseRouter.get("/", async (req,res) => {
    res.json({
        message:"preview endpoint"
    })
});

module.exports = {
    courseRouter:courseRouter
}