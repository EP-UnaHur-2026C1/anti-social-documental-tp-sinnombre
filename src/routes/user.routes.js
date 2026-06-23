import { Router } from "express";
import { loginUser, verifyEmail } from "../controllers/user.controller.js";

import {
    getUsers,
    getUserById,
    createUser,
    updateUser,
    deleteUser,
    followUser,
    unfollowUser
} from "../controllers/user.controller.js";

import { validateObjectId } from "../middlewares/validateObjectId.js";
import { validateUser } from "../middlewares/validateUser.js";

const router = Router();

router.get("/", getUsers);
router.post("/login", loginUser);
router.post("/", validateUser, createUser);
router.get("/verify/:token", verifyEmail); 

router.post("/follow", followUser);
router.delete("/unfollow", unfollowUser);

router.get("/:id", validateObjectId, getUserById);
router.put("/:id", validateObjectId, updateUser);
router.delete("/:id", validateObjectId, deleteUser);

export default router;