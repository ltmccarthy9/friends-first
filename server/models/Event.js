import mongoose from "mongoose";

const eventSchema = new mongoose.Schema({
    business: {
        type: String,
        required: true,
    },
    location: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    capacity: {
        type: Number,
        required: true,
    },
    taken: {
        type: Number,
        required: true,
    },
    category: {
        type: String,
        required: true,
    }
});

// we will need to add a date and time and auto remove from active events


const Event = mongoose.model("Event", eventSchema);
export default Event;