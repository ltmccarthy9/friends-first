import express from "express";
import { deleteUser, getUser, updateUser } from "../controllers/usercontroller.js";
import User from "../models/User.js";

const router = express.Router();


//UPDATE USER
router.put("/:id", updateUser);

//DELETE USER
router.delete("/:id", deleteUser);

// GET USER
router.get("/:id", getUser);

//ROUTE FOR OTHER USERS WHO WERE ALSO AT EVENT AND OPTED INTO SWIPE POOL


export default router;