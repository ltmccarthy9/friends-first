import express from "express";
import { deleteUser, getUser, updateUser, getUsers, addEvent} from "../controllers/usercontroller.js";
import { verifyToken, verifyUser, verifyAdmin  } from "../utils/verifyToken.js";

const router = express.Router();

//UPDATE USER
router.put("/:id", verifyUser, updateUser);

//DELETE USER
router.delete("/:id", deleteUser);

// GET USER
router.get("/:email", getUser);

//GET ALL FOR ADMIN
router.get("/", getUsers);

//JOIN AN EVENT
router.post("/join", addEvent);



//ROUTE FOR OTHER USERS WHO WERE ALSO AT EVENT AND OPTED INTO SWIPE POOL


export default router;