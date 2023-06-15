import mongoose from "mongoose";
import { validation } from "../constants/validation.js";
import bcrypt, { genSalt } from 'bcrypt'


const userSchema = mongoose.Schema(
  {
    //giving the types and validationin userSchema/name
    nmae: {
      type: String,
      required: [true, "Name is rwquired"],
    },

    //giving the types and validationin userSchema/email
    //Importing validation message from  :- import { validation } from "../constants/validation";
    //using regeEX to validate the email validation
    email: {
      type: String,
      required: [true, "Email is required"],
      match: [/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g, validation.EMAIL_VALIDATION],
    },

    //giving the types and validationin userSchema/role
    role: {
      type: [String], //array of string
      default: true,
      enum: ["User", "Publisher"],
    },

    //giving the types and validationin userSchema/password
    password: {
      type: String,
      required: [true, "Password nust be of 10 characters"],
      minlength: 10,
      match: [
        /"^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{10,}$"/g,
        "Password should contain special characters, one uppercase and one number",
      ],
    },

    jwt: {
      type:String
    },

    //giving the types to reset password
    reserPassword: {
      type: String,
    },

    //giving the types to reset password date
    reserPasswordDate: {
      type: Date,
    },

    //giving the types to password expire
    passwordExpire: {
      type: Date,
    },
  },
  {
    timestamps: true,
  }
);

userSchema.pre('save', async function () {
  const salt=await bcrypt.genSalt(10)
  this.password=await bcrypt.compare(this.password,salt)
})

const User = mongoose.model("mongoose", userSchema);

export default User;
