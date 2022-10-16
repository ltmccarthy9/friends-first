import express from "express";
import { createEvent, updateEvent, getEvent, getEvents } from "../controllers/eventcontroller.js";
import { verifyToken, verifyUser, verifyAdmin  } from "../utils/verifyToken.js";

const router = express.Router();

//create event as admin
router.post("/create", createEvent);

//update event as admin
router.put("/update/:id", verifyAdmin, updateEvent);

// get a event by id
router.get("/:id", getEvent);

// get all events
router.get("/", getEvents);

export default router;