import express from "express";
import { registerUser, loginUser, getProfile } from "../controllers/authController.js";
import authMiddleware from "../middlewares/authMiddleware.js";
import rateLimiter from "../middlewares/rateLimiter.js";

const router = express.Router();

router.post("/register",rateLimiter, registerUser);
router.post("/login",rateLimiter, loginUser);
router.get("/profile", authMiddleware, getProfile);

export default router;
