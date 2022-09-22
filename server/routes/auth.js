import express from "express";
import { loginUser, registerUser } from "../controllers/authcontroller.js";

const router = express.Router();

// Register route
router.post("/register", registerUser);
router.post("/login", loginUser);

export default router;