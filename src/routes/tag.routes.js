import { Router } from "express";

import {
    createTag,
    getTags,
    updateTag,
    deleteTag,
} from "../controllers/tag.controller.js";

import { authenticate } from "../middlewares/auth.middleware.js";
import {
    createTagValidation,
    updateTagValidation,
} from "../middlewares/validations/tag.validation.js";
import { validate } from "../middlewares/validate.js";

const router = Router();

router.post(
    "/",
    authenticate,
    createTagValidation,
    validate,
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
    updateTagValidation,
    validate,
    updateTag
);

router.delete(
    "/:id",
    authenticate,
    deleteTag
);

export default router;