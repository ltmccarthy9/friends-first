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

  
const User = mongoose.model('User', userSchema)

export default User;