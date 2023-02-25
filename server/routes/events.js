import express from "express";
import { createEvent, updateEvent, getEvent, getEvents,
     joinEvent, leaveEvent, editEventDate, getFutureEvents,
      getPastEvents, 
      getUserEvents} from "../controllers/eventcontroller.js";
import { verifyToken } from "../middleware/auth.js";

const router = express.Router();

//create event as admin
router.post("/create", createEvent);

//update event as admin
router.put("/update/:id", updateEvent);

//Add user to an event
router.patch("/join/:eventId", verifyToken, joinEvent);

//remove user from an event
router.patch('/leave/:eventId', verifyToken, leaveEvent);

//edit event date
router.patch('/edit/date/:eventId', editEventDate);

//get past events
router.get("/past", getPastEvents);

//get user's events
router.get("/future/yourevents/:id", getUserEvents)

//get upcoming events
router.get("/future/:id", getFutureEvents);


//get event by id
router.get("/:id", verifyToken, getEvent);

//get all events
router.get("/", getEvents);

export default router;