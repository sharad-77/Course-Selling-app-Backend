const { Router } = require("express");
const { adminSchema, adminModel } = require("../db");
const adminRouter = Router();

const ADMINSECRET = process.env.JWT_ADMIN_SECRET;

adminRouter.post("/signup", async (req, res) => {
    const { email, password, firstName, lastName } = req.body;
    const hasedPass = await bcrypt.hash(password, 5);
    console.log(hasedPass);
    try {
      await adminModel.create({
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
  
adminRouter.post("/signin", async (req, res) => {
    const { email, password } = req.body;
  
    const FindUser = await adminModel.findOne({
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
    },ADMINSECRET);
  
    console.log(token)
  
    res.json({
      token: token,
      message: "signin endpoint",
    });
  });

adminRouter.post("/course", async (req, res) => {
  res.json({
    message: "course endpoint",
  });
});
adminRouter.put("/course", async (req, res) => {
  res.json({
    message: "course endpoint",
  });
});

adminRouter.get("/course/bulk", async (req, res) => {
  res.json({
    message: "course endpoint",
  });
});

module.exports = {
  adminRouter: adminRouter,
};
