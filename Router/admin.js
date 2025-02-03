const { Router } = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { adminSchema, adminModel, courseModel } = require("../db");
const { adminMiddelware } = require("../middelware/admin");
const dotenv = require("dotenv");
dotenv.config();

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
      message: "Done !",
    });
  }
});

adminRouter.post("/signin", async (req, res) => {
  const { email, password } = req.body;

  const FindUser = await adminModel.findOne({
    email,
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

  const token = jwt.sign(
    {
      id: FindUser._id,
    },
    ADMINSECRET
  );

  console.log(token);

  res.json({
    token: token,
    message: "signin endpoint",
  });
});

adminRouter.post("/course", adminMiddelware, async (req, res) => {
  const { title, price, description, ImageURL } = req.body;
  const adminId = req.adminId;

  const course = await courseModel.create({
    title: title,
    price: price,
    description: description,
    ImageURL: ImageURL,
    creatorId: adminId,
  });

  res.json({
    message: "course created",
    couresId: course._id
  });
});

adminRouter.put("/course", adminMiddelware, async (req, res) => {
  const { title, price, description, ImageURL, courseId } = req.body;
  const adminId = req.adminId;

  const updateResult = await courseModel.updateOne(
    { _id: courseId, creatorId: adminId },
    { title: title, price: price, description: description, ImageURL: ImageURL }
    );

  console.log(updateResult._id)

  res.json({
    message: "Course updated successfully",
    courseId: updateResult._id,
  });
});

adminRouter.get("/course/bulk", adminMiddelware, async (req, res) => {
    const adminId = req.adminId;

    const findCourse = await courseModel.find({
      courseId: adminId
    });

    res.json({
      message:"Your all Course",
      findCourse: findCourse
    });

});

module.exports = {
  adminRouter: adminRouter,
};
