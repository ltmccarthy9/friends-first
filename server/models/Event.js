import mongoose from "mongoose";
import moment from 'moment';

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
    attendees: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }],
    category: {
        type: String,
        required: true,
    },
    date: {
        type: Date,
        required: true,
        get: (date) => moment(date).format('MM-DD-YYYY'),
        set: (date) => moment(date, 'MM-DD-YYYY'),
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
    time: {
        type: String,
        required: true,
    },
});

// we will need to add a date and time and auto remove from active events


const Event = mongoose.model("Event", eventSchema);
export default Event;