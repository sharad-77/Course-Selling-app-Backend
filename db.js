const dotenv = require('dotenv/config')
const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const ObjectId = mongoose.ObjectId;

require('dotenv').config();

mongoose.connect(process.env.MONGODB_URL)


const userSchema = new Schema({
  email: { type: String, unique: true },
  password: String,
  firstName: String,
  lastName: String,
});
const adminSchema = new Schema({
  email: { type: String, unique: true },
  password: String,
  firstName: String,
  lastName: String,
});
const courseSchema = new Schema({
  titel: String,
  price: Number,
  description: String,
  imageURL: String,
  creatorId: String,
});
const purchaseSchema = new Schema({
  userId: ObjectId,
  courseId: ObjectId,
});

const userModel = mongoose.model("user", userSchema);
const adminModel = mongoose.model("admin", adminSchema);
const courseModle = mongoose.model("course", courseSchema);
const purchaseModle = mongoose.model("purchase", purchaseSchema);


module.exports = {
    userModel: userModel,
    adminModel :adminModel,
    courseModle : courseModle,
    purchaseModle : purchaseModle 
}