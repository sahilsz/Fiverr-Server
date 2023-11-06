import express from "express";
import { verifyToken } from "../middleware/jwt.js";
import {
  getConversationHandler,
  getConversationsHandler,
  createConversationHandler,
  updateConversationHandler,
} from "../controllers/conversation.controller.js";

const router = express.Router();

router.get("/", verifyToken, getConversationsHandler);
router.get("/:id", verifyToken, getConversationHandler);
router.post("/", verifyToken, createConversationHandler);
router.put("/:id", verifyToken, updateConversationHandler);

export default router;
