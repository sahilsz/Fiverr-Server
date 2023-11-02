import express from "express";
import { verifyToken } from "../middleware/jwt.js";
import {
  newGigHandler,
  getGigHandler,
} from "../controllers/gig.controller.js";

const router = express.Router();

router.get("/", getAllGigsHandler);
router.post("/", verifyToken, newGigHandler);

export default router;
