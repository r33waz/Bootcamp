import express from "express";

const router = express.Router();

router.get("/", (req, res) => {
  res.send("reviews");
});

export default router;
