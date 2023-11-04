import express from "express";
import { verifyToken } from "../middleware/jwt.js";
import {
  createOrderHandler,
} from "../controllers/order.route.js";
const router = express.Router();

router.post("/:id", verifyToken, createOrderHandler);
export default router;
