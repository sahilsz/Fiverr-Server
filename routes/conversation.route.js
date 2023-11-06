import express from "express";
import { verifyToken } from "../middleware/jwt.js";
import {
  getConversationHandler,
  createConversationHandler,
} from "../controllers/conversation.controller.js";

const router = express.Router();

router.get("/", verifyToken, getConversationsHandler);
router.post("/", verifyToken, createConversationHandler);

export default router;
