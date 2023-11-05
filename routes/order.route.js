import express from "express";
import { verifyToken } from "../middleware/jwt.js";
import {
  createOrderHandler,
  getOrdersHandler,
} from "../controllers/order.route.js";
const router = express.Router();

router.post("/:id", verifyToken, createOrderHandler);
router.get("/", verifyToken, getOrdersHandler);
export default router;
