import express from "express";
import { loginUser, registerUser, registerGoogleUser } from "../controllers/authcontroller.js";

const router = express.Router();

// Register route
router.post("/register", registerUser);

// Login route
router.post("/login", loginUser);

router.post("/google", registerGoogleUser);
export default router;