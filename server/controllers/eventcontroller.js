import Event from "../models/Event.js";

// Create an event (must be admin)
export const createEvent = async (req, res, next) => {
    try {
        const newEvent = new Event({
            business: req.body.business,
            location: req.body.location,
            description: req.body.description,
            capacity: req.body.capacity,
            taken: req.body.taken,
            category: req.body.category
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
}

// Get an event
export const getEvent = async (req, res, next) => {
    try {
        const event = await Event.findById(req.params.id);
        res.status(200).json(event);
    } catch(err) {
        next(err);
    }
}