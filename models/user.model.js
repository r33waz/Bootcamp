import mongoose from "mongoose";
import { validation } from "../constants/validation.js";
import bcrypt from "bcrypt";
import crypto from "crypto";

const userSchema = mongoose.Schema(
  {
    //giving the types and validationin userSchema/name
    name: {
      type: String,
      required: [true, "Name is required"],
    },

    //giving the types and validationin userSchema/email
    //Importing validation message from  :- import { validation } from "../constants/validation";
    //using regeEX to validate the email validation
    email: {
      type: String,
      required: [true, "Email is required"],
      match: [/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/, validation.EMAIL_VALIDATION],
    },

    //giving the types and validationin userSchema/role
    role: {
      type: [String], //array of string
      default: "User",
      enum: ["User", "Publisher"],
    },

    //giving the types and validationin userSchema/password
    password: {
      type: String,
      required: [true, "Password must be of 10 characters"],
      minlength: 10,
      match: [
        /(?=^.{8,}$)((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/,
        "Password should contain special characters, one uppercase and one number",
      ],
    },

    jwt: {
      type: String,
    },

    //giving the types to reset password
    resetPasswordToken: {
      type: String,
    },

    //giving the types to reset password date
    resetPasswordTokenDate: {
      type: Date,
    },

    //giving the types to password expire
    resetpasswordTokenExpiretoken: {
      type: Date,
    },
  },
  {
    timestamps: true,
  }
);

userSchema.pre("save", async function () {
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

//creating a method to match password
userSchema.methods.matchpassword = async function (password) {
  return await bcrypt.compare(password, this.password);
};


//creating a method to reset password
//Using inbuild crypto method to hash the 
userSchema.methods.resetpassword = function () {
  const resetToken = crypto.randomBytes(10).toString("hex");
  // console.log(resetToken);
  this.resetPasswordToken = crypto
    .createHash("sha256")
    .update(resetToken)
    .digest("hex");
  // console.log(this.resetPasswordToken);
  //setting 5mis expire time
  this.resetpasswordTokenExpiretoken = Date.now() + 10 * 60 * 1000;

  return resetToken;
};

const User = mongoose.model("User", userSchema);

export default User;
