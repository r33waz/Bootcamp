import express from "express";
import { addCourse } from "../controllers/course.controller.js";

const router = express.Router();

router.get("/", (req, res) => {
  res.send("course");
});

router.post('/',addCourse)

export default router;
