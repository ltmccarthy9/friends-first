import express from "express";
import { createEvent, updateEvent, getEvent, getEvents, joinEvent, leaveEvent } from "../controllers/eventcontroller.js";
import { verifyToken } from "../middleware/auth.js";

const router = express.Router();

//create event as admin
router.post("/create", createEvent);

//update event as admin
router.put("/update/:id", updateEvent);

// get a event by id
router.get("/:id", verifyToken, getEvent);

// get all events
router.get("/", getEvents);

//Add user to an event
router.patch("/join/:eventId", verifyToken, joinEvent);

//remove user from an event
router.patch('/leave/:eventId', verifyToken, leaveEvent);

export default router;