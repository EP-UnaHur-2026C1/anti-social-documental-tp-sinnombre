import { Router } from "express";

import {
    getImages,
    getImageById,
    createImage,
    updateImage,
    deleteImage
} from "../controllers/postImage.controller.js";

import { validateObjectId } from "../middlewares/validateObjectId.js";
import { validateImage } from "../middlewares/validateImage.js";

const router = Router();

router.get("/", getImages);

router.get(
    "/:id",
    validateObjectId,
    getImageById
);

router.post(
    "/",
    validateImage,
    createImage
);

router.put(
    "/:id",
    validateObjectId,
    updateImage
);

router.delete(
    "/:id",
    validateObjectId,
    deleteImage
);

export default router;