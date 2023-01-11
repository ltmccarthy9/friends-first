import mongoose from "mongoose";

const userGSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        match: [/.+@.+\..+/, 'Must match an email address'],
    },
    age: {
        type: Number,
        required: true,
    },
    events: [{
        type: Schema.Types.ObjectId,
        ref: 'Event'
    }],
    photos: {
        type: [String],
    },
    isAdmin: {
        type: Boolean,
        default: false,
    }
},{timestamps: true});

//need array of user's future events (could also do past events)
// array of user's matches
    // to implement a chat we need a message row as well.
  
const UserG = mongoose.model('UserG', userGSchema)

export default UserG;