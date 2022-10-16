import express from "express";
import { deleteUser, getUser, updateUser, getUsers, getUserG, deleteUserG, updateUserG } from "../controllers/usercontroller.js";
import { verifyToken, verifyUser, verifyAdmin  } from "../utils/verifyToken.js";

const router = express.Router();

//UPDATE USER
router.put("/:id", verifyUser, updateUser);

//DELETE USER
router.delete("/:id", deleteUser);

// GET USER
router.get("/:email", getUser);

// GET google user
router.get("/google/:email", getUserG);

// DELETE google user
router.delete("/google/:email", deleteUserG);

// UPDATE google user
router.put("/google/:email", updateUserG);

//GET ALL FOR ADMIN
router.get("/", getUsers);



//ROUTE FOR OTHER USERS WHO WERE ALSO AT EVENT AND OPTED INTO SWIPE POOL


export default router;