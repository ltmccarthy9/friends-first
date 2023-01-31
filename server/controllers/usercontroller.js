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
        const userId = req.params.id
        const user = await User.findById(userId);
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

export const addFriend = async (req, res, next) => {
    try {
       const userId = req.params.id
       const user2Id = req.params.id2

       const user = await User.findById(userId);
       const user2 = await User.findById(user2Id);

       if (user2.liked.includes(userId)) {
        user.friends.push(user2Id);
        user2.friends.push(userId);
       } else {
        user.liked.push(user2Id);
       }

       await user.save();
       await user2.save();

       res.status(200).json("Success!")
    } catch (err) {
        next(err);
    }
}



