import express from "express";
import { register } from "../controllers/user.controller.js";

const router = express.Router();

router.post('/register',register)
// router.get('/login',register)
// router.get('/logout',register)
// router.get('/me',register)
// router.get('/updateDetails',register)
// router.get('/updatePassword',register)
// router.get('/forgetPassword',register)
// router.get('/resetpassword',register)

export default router;
