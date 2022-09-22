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
    distance: {
        type: Number
    },
    description: {
        type: String,
        required: true,
    },
    spots: {
        type: Number,
        required: true,
    },
    taken: {
        type: Number,
        required: true,
    }
});

export default mongoose.model("Event", eventSchema);