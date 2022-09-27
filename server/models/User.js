import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    firstname: {
        type: String,
        required: true,
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
    },
},{timestamps: true});

export default mongoose.model("User", userSchema);