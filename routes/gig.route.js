import express from "express";
import { verifyToken } from "../middleware/jwt.js";
import {
  newGigHandler,
} from "../controllers/gig.controller.js";

const router = express.Router();

router.post("/", verifyToken, newGigHandler);

export default router;
