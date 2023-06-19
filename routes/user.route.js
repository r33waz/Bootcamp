import express from "express";
import { forget_password, loginUser, register, resetpassword } from "../controllers/user.controller.js";
import { authorizationUser } from "../middlewares/auth.middleware.js";

const router = express.Router();

router.post('/register',register)
router.post('/login',loginUser)
// router.get("/logout", authorizationUser,logout);
// router.get("/me", authorizationUser,me);
// router.get('/updateDetails',register)
// router.get('/updatePassword',register)
router.post('/forgetPassword',forget_password)
router.put('/resetpassword/:resettoken',resetpassword)

export default router;
