import User from "../models/User.js";
import bcrypt from "bcryptjs"
import createError from "../utils/error.js";
import jwt from "jsonwebtoken";

// Signup/Register user
export const registerUser = async (req, res, next) => {
    try {
        // use bcrypt to encode user password
        // assign the hashed password as the password for user
        if(req.body.password !== req.body.password2){
            return res.status(400).json({message: "passwords must match"});
        }

        const salt = bcrypt.genSaltSync(10);
        const hash = await bcrypt.hash(req.body.password, salt)
 
        const newUser = new User({
            name: req.body.name,
            email: req.body.email,
            password: hash,
            birthdate: req.body.birthdate
        })

        await newUser.save();
        res.status(201).json({message: "user successfully registered!"});
    } catch(error) {
        if(error.name === 'ValidationError') {
            let errors = {};

            Object.keys(error.errors).forEach((key) => {
                errors[key] = error.errors[key].message;
            });
            
            return res.status(400).json({error: errors});
        }
        next(error);
    }
};


// Login user 
export const loginUser = async (req, res, next) => {
    try {
        //grab the user email from the request body
        const email = req.body.email;
        //find the user with that email
        const user = await User.findOne({email: email});
        //if there is no user, return error
        if(!user) {
            return next(createError(404, "User not found."))
        }
        // compare password from front end with encrypted password
        const isPasswordCorrect = await bcrypt.compare(req.body.password, user.password)
        // if the password is not correct return error
        if(!isPasswordCorrect) {
            return next(createError(400), "Wrong password or username.")
        }

        //create json web token
        const token = jwt.sign({ id: user._id}, process.env.JWT);
        delete user.password;

        //send token and user
        res.status(200).json({ token, user});
    } catch(err) {
        next(err);
    }
}; 