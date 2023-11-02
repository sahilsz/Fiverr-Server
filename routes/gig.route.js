import express from "express";
import { verifyToken } from "../middleware/jwt.js";
import {
  newGigHandler,
  deleteGigHandler,
  getGigHandler,
  getAllGigsHandler,
} from "../controllers/gig.controller.js";

const router = express.Router();

router.get("/", getAllGigsHandler);
router.get("/:id", getGigHandler);
router.post("/", verifyToken, newGigHandler);
router.delete("/:id", verifyToken, deleteGigHandler);

export default router;
