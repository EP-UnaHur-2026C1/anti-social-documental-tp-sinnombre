import { Router } from "express";

import {
    getTags,
    getTagById,
    createTag,
    updateTag,
    deleteTag
} from "../controllers/tag.controller.js";

import { validateObjectId } from "../middlewares/validateObjectId.js";
import { validateTag } from "../middlewares/validateTag.js";

const router = Router();

router.get("/", getTags);

router.get(
    "/:id",
    validateObjectId,
    getTagById
);

router.post(
    "/",
    validateTag,
    createTag
);

router.put(
    "/:id",
    validateObjectId,
    updateTag
);

router.delete(
    "/:id",
    validateObjectId,
    deleteTag
);

export default router;