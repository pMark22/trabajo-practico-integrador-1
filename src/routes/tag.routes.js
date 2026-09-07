import { Router } from "express";

import {
    createTag,
    getTags,
    getTagById,
    updateTag,
    deleteTag,
} from "../controllers/tag.controller.js";

import { authenticate } from "../middlewares/auth.middleware.js";
import { adminMiddleware } from "../middlewares/admin.middleware.js";

import {
    createTagValidation,
    updateTagValidation,
    tagIdValidation,
} from "../middlewares/validations/tag.validation.js";

import { validate } from "../middlewares/validate.js";

const router = Router();

router.post(
    "/",
    authenticate,
    adminMiddleware,
    createTagValidation,
    validate,
    createTag
);

router.get(
    "/",
    authenticate,
    getTags
);

router.get(
    "/:id",
    authenticate,
    tagIdValidation,
    validate,
    getTagById
);

router.put(
    "/:id",
    authenticate,
    adminMiddleware,
    updateTagValidation,
    validate,
    updateTag
);

router.delete(
    "/:id",
    authenticate,
    adminMiddleware,
    tagIdValidation,
    validate,
    deleteTag
);

export default router;