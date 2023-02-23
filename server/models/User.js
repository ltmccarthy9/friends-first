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
    birthdate: {
        type: Date,
        required: true,
        validate: {
            validator: function(age) {
                const minAge = 18
                const currentDate = new Date();
                const minDate = new Date(currentDate.getFullYear() - minAge, currentDate.getMonth(), currentDate.getDate());
                
                return age <= minDate;
            },
            message: "You must be at least 18 years old to sign up"
        }
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