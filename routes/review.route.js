import express from "express";
import { verifyToken } from "../middleware/jwt.js";
import { createReviewHandler } from "../controllers/review.controller.js";
const router = express.Router();

router.post("/", verifyToken, createReviewHandler);

export default router;
