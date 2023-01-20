import express from "express";
import { deleteUser, getUser, updateUser, getUsers} from "../controllers/usercontroller.js";
import { verifyToken } from "../middleware/auth.js";

const router = express.Router();

//UPDATE USER
router.put("/:id", verifyToken, updateUser);

//DELETE USER
router.delete("/:id", verifyToken, deleteUser);
 
// GET USER
router.get("/:email", getUser);

//GET ALL FOR ADMIN
router.get("/", getUsers);


export default router;