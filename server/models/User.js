import { Schema, model } from "mongoose";

const userSchema = new Schema({
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
    liked: [{
        type: Schema.Types.ObjectId,
        ref: 'User'
    }],
    friends: [{
        type: Schema.Types.ObjectId,
        ref: 'User'
    }],
    isAdmin: {
        type: Boolean,
        default: false,
    }
},{timestamps: true});

  
const User = model('User', userSchema)

export default User;