import express from "express";
import { verifyToken } from "../middleware/jwt.js";
import {
  createReviewHandler,
  getReviewHandler,
} from "../controllers/review.controller.js";
const router = express.Router();

router.post("/", verifyToken, createReviewHandler);
router.get("/:id", getReviewHandler);

export default router;
