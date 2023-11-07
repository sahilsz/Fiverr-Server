import express from "express";
import { verifyToken } from "../middleware/jwt.js";
import {
  confirmPayment,
  getOrdersHandler,
  createPaymentIntent,
} from "../controllers/order.controller.js";
const router = express.Router();

// router.post("/:id", verifyToken, createOrderHandler);
router.get("/", verifyToken, getOrdersHandler);
router.post("/create-payment-intent/:id", verifyToken, createPaymentIntent);
export default router;
