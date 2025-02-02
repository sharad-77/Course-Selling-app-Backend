const { Router } = require("express");
const bcrypt = require("bcrypt");
const { configDotenv } = require("dotenv");
const jwt = require("jsonwebtoken");
const { userModel, purchaseModle } = require("../db");
const userRouter = Router();

const USERSECRET = process.env.JWT_USER_SECRET;

userRouter.post("/signup", async (req, res) => {
  const { email, password, firstName, lastName } = req.body;
  const hasedPass = await bcrypt.hash(password, 5);
  console.log(hasedPass);
  try {
    await userModel.create({
      email: email,
      password: hasedPass,
      firstName: firstName,
      lastName: lastName,
    });
  } catch {
    res.status(403).json({
      message: "Erorr Occured",
    });
  } finally {
    res.json({
      email: email,
      firstName: firstName,
      lastName: lastName,
      message: "Done !",
    });
    console.log("Signup Complated");
  }
});

userRouter.post("/signin", async (req, res) => {
  const { email, password } = req.body;

  const FindUser = await userModel.findOne({
    email
  });

  if (!FindUser) {
    res.json({
      message: "Your Credential Are Wrong",
    });
  }
  console.log(FindUser);

  const Comparepass = await bcrypt.compare(password, FindUser.password);

  if (!Comparepass) {
    res.json({
      message: "Your Password Is Wrong",
    });
  }

  const token = jwt.sign({
    id:FindUser._id
  },USERSECRET);

  console.log(token)

  res.json({
    token: token,
    message: "signin endpoint",
  });
});

userRouter.get("/purchases", async (req, res) => {
  res.json({
    message: "purchases endpoint",
  });
});

module.exports = {
  userRouter: userRouter,
};
