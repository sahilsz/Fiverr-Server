import express from "express";
import { verifyToken } from "../middleware/jwt.js";
import {
  createMessageHandler,
} from "../controllers/message.controller.js";

const router = express.Router();

router.post("/", verifyToken, createMessageHandler);

export default router;
