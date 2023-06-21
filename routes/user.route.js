import express from "express";
import { forget_password, loginUser, register, resetpassword, updateDetails, updatePassword } from "../controllers/user.controller.js";
import { authorizationUser, authorize } from "../middlewares/auth.middleware.js";

const router = express.Router();

router.post('/register',register)
router.post('/login',loginUser)
// router.get("/logout", authorizationUser,logout);
// router.get("/me", authorizationUser,me);
router.get('/updateDetails',authorizationUser,authorize,updateDetails)
router.get('/updatePassword',authorizationUser,authorize,updatePassword)
router.post('/forgetPassword',forget_password)
router.put('/resetpassword/:resettoken',resetpassword)

export default router;
