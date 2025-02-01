const { Router } = require('express');
const {adminSchema} = require('../db')
const adminRouter =  Router();

adminRouter.post("/signup", async (req,res) => {
    res.json({
        message:"signup endpoint"
    })
});

adminRouter.post("/signin", async (req,res) => {
    res.json({
        message:"signin endpoint"
    })
});

adminRouter.post("/", async (req,res) => {
    res.json({
        message:"course endpoint"
    })
});

adminRouter.post("/bulk", async (req,res) => {
    res.json({
        message:"course endpoint"
    })
});

module.exports = {
    adminRouter:adminRouter
}