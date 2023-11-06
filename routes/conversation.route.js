import express from "express";
import { verifyToken } from "../middleware/jwt.js";
import {
  getConversationHandler,

const router = express.Router();

router.get("/", verifyToken, getConversationsHandler);

export default router;
