import { Router } from "express";

import {
    createTag,
    getTags,
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

export default router;