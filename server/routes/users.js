import express from "express";
import { deleteUser, getUser, updateUser, getUsers } from "../controllers/usercontroller.js";
import { verifyToken, verifyUser, verifyAdmin  } from "../utils/verifyToken.js";

const router = express.Router();

//UPDATE USER
router.put("/:id", verifyUser, updateUser);

//DELETE USER
router.delete("/:id", verifyUser, deleteUser);

// GET USER
router.get("/:id", verifyUser, getUser);


//GET ALL FOR ADMIN
router.get("/", verifyAdmin, getUsers);



//ROUTE FOR OTHER USERS WHO WERE ALSO AT EVENT AND OPTED INTO SWIPE POOL


export default router;