import config from "../config/config.js";
import User from "../models/user.model.js";
import jwt from "jsonwebtoken";
import { sendEmail } from "../utils/sendmail.js";
import crypto from "crypto";

export const register = async (req, res) => {
  try {
    //destructuring email form req.body to verify the existing user
    console.log(req.body);
    const { email } = req.body;
    const current_User = await User.findOne({ email });

    //checking if the use name is aleady exist
    if (!current_User) {
      const user = new User(req.body);
      await user.save();

      res.status(200).json({
        status: true,
        data: user,
        message: "user registered sucessfully ✅",
      });
    } else {
      res.status(400).json({
        status: false,
        message: "User already exist",
      });
    }
  } catch (error) {
    res.status(400).json({
      status: false,
      error: error.message,
    });
  }
};

// login function for user
export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    //check if the user email matches or not
    //if user email doesnot matches run if condition
    if (!user) {
      res.status(401).json({
        status: false,
        message: "Invalid credentials ❌",
      });
    }
    //if user password matches then run else condition
    else {
      const password_match = await user.matchpassword(password);
      //if the encrypt password matches with bcrypt password then
      //run if condition for login sucessfull
      if (password_match) {
        //1 creatng jwt token
        //jwt is divided into 3 category and all are included in Headers
        //1 :- algorithm used
        //2 :- playload
        //3 :- signature
        const token = jwt.sign({ id: user._id }, config.JWT_TOKEN, {
          expiresIn: "1h",
        });

        //2 Storing jwt token on our end
        const userUpdate = await User.findOneAndUpdate(
          { _id: user._id },
          {
            //storing token
            $set: { jwt: token },
          },
          //third parameter to store the updated data
          {
            new: true,
          }
        );

        return res.status(200).json({
          status: true,
          data: userUpdate.jwt,
          message: "User loggedin sucessfull ✅",
        });
      }
      //otherwis run else condtion for unsucessfull login
      else {
        res.status(400).json({
          status: false,
          message: "User login unsucessfull ❌",
        });
      }
    }
  } catch (error) {
    res.status(400).json({
      status: false,
      error: error.message,
    });
  }
};

//for logOut user
// export const me = async (req, res) => {

// }

//creating a function to forget password
export const forget_password = async (req, res) => {
  try {
    const { email } = req.body;
    const user = await User.findOne({ email });

    if (!user) {
      res.statue(400).json({
        status: true,
        message: "User not found",
      });
    }
    //accessing the reset token from resertpassword method/function
    const resetToken = user.resetpassword();
    console.log(resetToken);

    const message =
      config.MESSAGE + ":- " + resetToken + " " + config.TOKEN_EXPIRE;

    try {
      await sendEmail({
        email,
        subject: "Password reset token",
        message,
      });
      await user.save({ validateBeforeSave: false });
    } catch (error) {
      (user.resetpasswordExpiretoken = undefined),
        (user.resetPasswordToken = undefined),
        await user.save({ validateBeforeSave: false });
      res.status(401).json({
        status: false,
        message: "Email send failed",
      });
    }

    return res.status(201).json({
      status: true,
      message: "Email sent sucessfully",
    });
  } catch (error) {}
};


//cearting controller for forget password
export const resetpassword = async (req, res) => {
  try {
    const { resettoken } = req.params
    //hashing reset token
    const resetPasswordToken = crypto
      .createHash("sha256")
      .update(resettoken)
      .digest("hex");
    
    //finding user according to reset password token form the data base
    const user = await User.findOne({
      resetPasswordToken,
      resetpasswordExpiretoken: { $gt: Date.now() },
    });
     if (!user) {
       return res.ststus(400).json({
         status: false,
         message:'Invalid token oe token expired'
     })
    }
  
    //updating the password using id
    const updatedPassword=await user.findOneAndUpdate({
      _id:user._id
    }, {
      $set: {
        password: req.body.password,
        resetpasswordExpiretoken : undefined,
        resetPasswordToken : undefined
      }
    }, {
      new:true
    })
    res.send(updatedPassword);
  } catch (error) {
    
  }
}