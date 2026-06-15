import { Router } from "express";

import {
    getComments,
    getCommentById,
    createComment,
    updateComment,
    deleteComment
} from "../controllers/comment.controller.js";

import { validateObjectId } from "../middlewares/validateObjectId.js";
import { validateComment } from "../middlewares/validateComment.js";
import { commentsVisibility } from "../middlewares/commentsVisibility.js";

const router = Router();

router.get(
    "/",
    commentsVisibility,
    getComments
);

router.get(
    "/:id",
    validateObjectId,
    commentsVisibility,
    getCommentById
);

router.post(
    "/",
    validateComment,
    createComment
);

router.put(
    "/:id",
    validateObjectId,
    updateComment
);

router.delete(
    "/:id",
    validateObjectId,
    deleteComment
);

export default router;