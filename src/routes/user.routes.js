import { Router } from "express";

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

router.get(
    "/:id",
    validateObjectId,
    getUserById
);

router.post(
    "/",
    validateUser,
    createUser
);

router.put(
    "/:id",
    validateObjectId,
    updateUser
);

router.delete(
    "/:id",
    validateObjectId,
    deleteUser
);

router.post(
    "/follow",
    followUser
);

router.delete(
    "/unfollow",
    unfollowUser
);

export default router;