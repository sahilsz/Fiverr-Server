import express from "express";
import { deleteUserHandler } from "../controllers/user.controller.js";
import { verifyToken } from "../middleware/jwt.js";

const router = express.Router();

router.delete("/:id", verifyToken, deleteUserHandler);

export default router;
