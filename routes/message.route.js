import express from "express";
import { verifyToken } from "../middleware/jwt.js";
import {
  createMessageHandler,
  getMessagesHandler,
} from "../controllers/message.controller.js";

const router = express.Router();

router.post("/", verifyToken, createMessageHandler);
router.get("/:id", verifyToken, getMessagesHandler);

export default router;
