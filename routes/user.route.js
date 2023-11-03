import express from "express";
import {
  deleteUserHandler,
  getUserHandler,
} from "../controllers/user.controller.js";
import { verifyToken } from "../middleware/jwt.js";

const router = express.Router();

router.get("/:id", getUserHandler);
router.delete("/:id", verifyToken, deleteUserHandler);

export default router;
