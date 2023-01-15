import User from "../models/User.js";

// Update user
export const updateUser = async (req, res, next) => {
    try {
        //update user by using the id in the request paramter :id
        //update information with req.body
        //"new: true" responds with the updated collection
        const updatedUser = await User.findByIdAndUpdate(
            req.params.id,
            { $set: req.body},
            { new: true }
            );
        
            res.status(200).json(updatedUser);
    } catch(err) {
       next(err);
    }
}

// Delete user by id
export const deleteUser = async (req, res, next) => {
    try {
        //because we are deleting we don't need to assign 
        //this to a variable to respond.
        await User.findOneAndDelete({email: req.params.id});
        res.status(200).json("User has been deleted.");
    } catch(err) {
      next(err);
    }
}

// Get single user by id
export const getUser = async (req, res, next) => {
    try {
        const user = await User.findOne({email: req.params.email});
        res.status(200).json(user);
    } catch(err) {
        next(err);
    }
}

// Get all users (must be admin)
export const getUsers = async (req, res, next) => {
    try {
        const users = await User.find();
        res.status(200).json(users);
    } catch {
        next(err);
    }
}

//add an event to a user's profile
export const addEvent = async (req, res, next) => {
    try {
        const user = await User.findById(req.body.userId);
        user.events.push(req.body.eventId);
    } catch (err) {
        console.log(err);
    }
}



