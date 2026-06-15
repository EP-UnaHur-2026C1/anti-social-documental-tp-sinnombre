import { Router } from "express";

import {
    getPosts,
    getPostById,
    createPost,
    updatePost,
    deletePost,
    addTagToPost,
    removeTagFromPost,
    addImageToPost,
    removeImageFromPost
} from "../controllers/post.controller.js";

import { validateObjectId } from "../middlewares/validateObjectId.js";
import { validatePost } from "../middlewares/validatePost.js";

const router = Router();

router.get("/", getPosts);

router.get(
    "/:id",
    validateObjectId,
    getPostById
);

router.post(
    "/",
    validatePost,
    createPost
);

router.put(
    "/:id",
    validateObjectId,
    updatePost
);

router.delete(
    "/:id",
    validateObjectId,
    deletePost
);

router.post(
    "/add-tag",
    addTagToPost
);

router.delete(
    "/remove-tag",
    removeTagFromPost
);

router.post(
    "/add-image",
    addImageToPost
);

router.delete(
    "/remove-image",
    removeImageFromPost
);

export default router;