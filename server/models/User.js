import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
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
    password: {
        type: String,
        required: true,
    },
    age: {
        type: Number,
        required: true,
    },
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
  
const User = mongoose.model('User', userSchema)

export default User;