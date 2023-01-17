import Event from "../models/Event.js";
import User from "../models/User.js";


// Create an event (must be admin)
export const createEvent = async (req, res, next) => {
    try {
        const newEvent = new Event({
            business: req.body.business,
            location: req.body.location,
            description: req.body.description,
            capacity: req.body.capacity,
            taken: req.body.taken,
            category: req.body.category,
            date: req.body.date,
            time: req.body.time
        })

        await newEvent.save();
        res.status(200).send("Event has been created")
    } catch(err) {
        next(err);
    }
};

// Update an event (must be admin)
export const updateEvent = async (req, res, next) => {
    try {
        const updatedEvent = await Event.findByIdAndUpdate(
            req.params.id,
            { $set: req.body},
            { new: true }
            );
        
            res.status(200).json(updatedEvent);
    } catch(err) {
       next(err);
    }
};

// Get an event
export const getEvent = async (req, res, next) => {
    try {
        const event = await Event.findById(req.params.id);
        res.status(200).json(event);
    } catch(err) {
        next(err);
    }
};

//get all events (will add parameters for only events within certain range)
export const getEvents = async (req, res, next) => {
    try {
        const events = await Event.find();
        res.status(200).json(events);
    } catch (err) {
        next(err);
    }
};

//add a user to an event
export const joinEvent = async (req, res, next) => {
    try {
        //grab event id from request body
        const eventId = req.params.eventId;
        const userId = req.body.userId
        //find event by that id
        const event = await Event.findById(eventId);
        //if the event no longer exists, send error
        if (!event) return res.status(404).send({ error: "Event not found" });

        const user = await User.findById(userId);
        // add user to attendees array
        event.attendees.push(userId);
        await event.save()

        res.send(event).status(200).json(`${user.name} added to ${event.business} event`)
    } catch (err) {
        next(err);
    }
    
};

// remove user from an event.
export const leaveEvent = async (req, res, next) => {
    try {
        const eventId = req.params.eventId;
        const userId = req.body.userId;

        const event = await Event.findById(eventId);
        if(!event) return res.status(404).send({ error: 'Event not found' });
        const user = await User.findById(userId);

        event.attendees = event.attendees.filter(id => id = !userId);
        await event.save();
        res.send(event).status(200).json(`${user.name} removed from ${event.business} event`)
    } catch (err) {
        next(err);
    }
};
