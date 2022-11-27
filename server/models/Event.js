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
    },
    date: {
        type: Date,
        required: true,
        validate: {
            validator: function (v) {
                return(
                    v &&
                    v.getTime() > Date.now() + 24 * 60 * 60 * 1000 &&
                    v.getTime() < Date.now() + 90 * 24 * 60 * 60 * 1000
                );
            },
            message: "Event must be at least one day from now and no more than ninety days out"
        }
        
    },
});

// we will need to add a date and time and auto remove from active events


const Event = mongoose.model("Event", eventSchema);
export default Event;