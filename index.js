const express = require("express");
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const {dotenv} = require('dotenv/config');
require('dotenv').config();

const app = express();
const { userRouter } = require("./Router/user");
const { courseRouter } = require("./Router/course");
const { adminRouter } = require("./Router/admin");

app.use(express.json());
app.use("/api/v1/user", userRouter);
app.use("/api/v1/course", courseRouter);
app.use("/api/v1/admin", adminRouter);

async function main() {
    await mongoose.connect(process.env.MONGODB_URL);
    app.listen(3000);
    console.log(`Local Host Runing on Port : 3000`);
}

main();