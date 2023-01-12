import express from "express";
import { loginUser, registerUser } from "../controllers/authcontroller.js";

const router = express.Router();

// Register route
router.post("/register", registerUser);

// Login route
router.post("/login", loginUser);


export default router;