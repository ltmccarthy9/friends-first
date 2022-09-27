import express from "express";
import { createEvent, updateEvent, getEvent } from "../controllers/eventcontroller";
import { verifyToken, verifyUser, verifyAdmin  } from "../utils/verifyToken.js";

const router = express.Router();

//create event as admin
router.post("/create", verifyAdmin, createEvent);

//update event as admin
router.put("/update/:id", verifyAdmin, updateEvent);

// get a event by id
router.get("/:id", getEvent);

export default router;