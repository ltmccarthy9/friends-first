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

export default mongoose.model("Event", eventSchema);