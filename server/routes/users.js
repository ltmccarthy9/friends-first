import express from "express";
import User from "../models/User.js";

const router = express.Router();

//CREATE USER
router.post("/", async (req,res) => {
    
    const newUser = new User(req.body);

    try {
        const savedUser = await newUser.save();
        res.status(200).json(savedUser);
    } catch(err) {
        res.status(500).json(err)
    }
})

// GET USER
router.get("/:id", (req, res) => {
    res.send("Hello this is user endpoint")
});


export default router;