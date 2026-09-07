import { Router } from "express";

import {
    createTag,
    getTags,
    updateTag,
    deleteTag,
} from "../controllers/tag.controller.js";

import { authenticate } from "../middlewares/auth.middleware.js";

const router = Router();

router.post(
    "/",
    authenticate,
    createTag
);

router.get(
    "/",
    authenticate,
    getTags
);

router.put(
    "/:id",
    authenticate,
    updateTag
);

router.delete(
    "/:id",
    authenticate,
    deleteTag
);

export default router;