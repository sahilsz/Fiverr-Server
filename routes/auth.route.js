import express from "express";
import {
  registerUserHandler,
  loginUserHandler,
  logoutUserHandler,
} from "../controllers/auth.controller.js";

const router = express.Router();

router.post("/register", registerUserHandler);
router.post("/login", loginUserHandler);
router.post("/logout", logoutUserHandler);

export default router;
