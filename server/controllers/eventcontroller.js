import Event from "../models/Event.js";
import User from "../models/User.js";
import moment from 'moment';
import axios from 'axios';
import getDistanceUserToEvent from "../utils/getDistance.js";

// Create an event (must be admin)
export const createEvent = async (req, res, next) => {
    try {
        const newEvent = new Event({
            business: req.body.business,
            address: req.body.address,
            description: req.body.description,
            capacity: req.body.capacity,
            category: req.body.category,
            date: req.body.date,
            time: req.body.time,
            lat: req.body.lat,
            lng: req.body.lng
        })

        await newEvent.save();
        res.status(200).json({message: "Event has been created"})
    } catch(error) {
        if(error.name === 'ValidationError') {
            let errors = {};

            Object.keys(error.errors).forEach((key) => {
                errors[key] = error.errors[key].message;
            });
            
            return res.status(400).json({error: errors});
        }
        next(error);
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

//get all events
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
        //grab event id from request parameters
        const eventId = req.params.eventId;
        //grab userId from request bodyu\
        const userId = req.body.userId
        //find event by that id
        const event = await Event.findById(eventId);
        //if the event no longer exists, send error
        if (!event) return res.status(404).send({ error: "Event not found" });

        //grab user by id so we can send name in message
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

//edit event date
export const editEventDate = async (req, res, next) => {
    try{
        const newDate = req.body.date
        const event = await Event.findById(req.params.eventId)
        if(!event) return res.status(404).send({ error: 'Event not found' });

        event.date = newDate;
        await event.save();
        res.status(200).json('successfully edited event date')
    } catch (err) {
        next(err);
    }
}

// get upcoming events
export const getFutureEvents = async (req, res, next) => {
    try {
        const userId = req.params.id
        let now = moment().toISOString();
        const events = await Event.find({
            date: { $gte: now},
            attendees: { $nin: [userId]}
        });
        res.status(200).json(events);
    } catch (err) {
        console.log(err);
        next(err);
    }
};


//get past events
export const getPastEvents = async (req, res, next) => {
    try {
        let now = moment().toISOString();
        const events = await Event.find({date: { $lt: now}});

        res.status(200).json(events);
    } catch (err) {
        console.log(err);
        next(err);
    }
};

//get user's events
export const getUserEvents = async (req, res, next) => {
    try {
        const userId = req.params.id
        let now = moment().toISOString();
        const events = await Event.find({
            date: { $gte: now},
            attendees: { $in: [userId]}
        });
        res.status(200).json(events);
    } catch (err) {
        console.log(err);
        next(err);
    }
};
