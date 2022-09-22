import express from "express";
import User from "../models/User.js";

const router = express.Router();

//CREATE USER
router.post("/", async (req,res) => {
    
    //assign new user to newUser so we can respond with
    //the created user
    const newUser = new User(req.body);

    try {
        const savedUser = await newUser.save();
        res.status(200).json(savedUser);
    } catch(err) {
        res.status(500).json(err)
    }
})


//UPDATE USER
router.put("/:id", async (req,res) => {
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
        res.status(500).json(err)
    }
});

//DELETE USER
router.delete("/:id", async (req,res) => {
    try {
        //because we are deleting we don't need to assign 
        //this to a variable to respond.
        await User.findByIdAndDelete(req.params.id);
        res.status(200).json("User has been deleted.");
    } catch(err) {
        res.status(500).json(err)
    }
});

// GET USER
router.get("/:id", async (req,res) => {
    try {
        const user = await User.findById(req.params.id);
        res.status(200).json(user);
    } catch(err) {
        res.status(500).json(err)
    }
});

//ROUTE FOR OTHER USERS WHO WERE ALSO AT EVENT AND OPTED INTO SWIPE POOL


export default router;