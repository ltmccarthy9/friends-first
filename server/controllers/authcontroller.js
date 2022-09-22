import User from "../models/User.js";
import bcrypt from "bcryptjs"
import createError from "../utils/error.js";
import jwt from "jsonwebtoken";

export const registerUser = async (req, res, next) => {
    try {

        // use bcrypt to encode user password
        // assign the hashed password as the password for user
        const salt = bcrypt.genSaltSync(10);
        const hash = bcrypt.hashSync(req.body.password, salt)

        const newUser = new User({
            firstname: req.body.firstname,
            lastname: req.body.lastname,
            email: req.body.email,
            password: hash,
            age: req.body.age
        })

        await newUser.save();
        res.status(200).send("User has been created")
    } catch(err) {
        next(err);
    }
};

export const loginUser = async (req, res, next) => {
    try {
        const user = await User.findOne({email: req.body.email})
        if(!user) {
            return next(createError(404, "User not found."))
        }

        const isPasswordCorrect = await bcrypt.compare(req.body.password, user.password)
        if(!isPasswordCorrect) {
            return next(createError(400), "Wrong password or username.")
        }

        const token = jwt.sign({ id: user._id, isAdmin: user.isAdmin }, "secret123")

        const { password, isAdmin, ...otherDetails } = user._doc;
        res.status(200).json({...otherDetails})
    } catch(err) {
        next(err);
    }
}