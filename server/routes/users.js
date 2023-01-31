import express from "express";
import { deleteUser, getUser, updateUser, getUsers, addFriend} from "../controllers/usercontroller.js";
import { verifyToken } from "../middleware/auth.js";

const router = express.Router();

//UPDATE USER
router.patch("/:id", verifyToken, updateUser);

//ADD A FRIEND
router.patch("/add/:id/:id2", verifyToken, addFriend);

//DELETE USER
router.delete("/:id", verifyToken, deleteUser);
 
// GET USER
router.get("/:id", getUser);

//GET ALL FOR ADMIN
router.get("/", getUsers);



export default router;