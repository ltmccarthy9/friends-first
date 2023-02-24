import { Schema, model }from "mongoose";
import moment from 'moment';

const eventSchema = new Schema({
    business: {
        type: String,
        required: true,
    },
    address: {
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
    attendees: [{
        type: Schema.Types.ObjectId,
        ref: 'User'
    }],
    category: {
        type: String,
        required: true,
    },
    date: {
        type: Date,
        required: true,
        get: (date) => moment(date).toISOString(),
        // set: (date) => moment(date, 'MM-DD-YYYY'),
        // validate: {
        //     validator: function (v) {
        //         return(
        //             v &&
        //             v.getTime() > Date.now() + 24 * 60 * 60 * 1000 &&
        //             v.getTime() < Date.now() + 90 * 24 * 60 * 60 * 1000
        //         );
        //     },
        //     message: "Event must be at least one day from now and no more than ninety days out"
        // }
        
    },
    time: {
        type: String,
        required: true,
        match: [/^(1[012]|[1-9]):[0-5][0-9] ?([AP]M)$/i, 'Date must be properly formatted.'],
    },
    lat: {
        type: Number
    },
    lng: {
        type: Number
    }
});

// we will need to add a date and time and auto remove from active events


const Event = model("Event", eventSchema);
export default Event;