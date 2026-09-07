import { Router } from "express";

import {
    addTagToArticle,
    deleteTagFromArticle,
} from "../controllers/articleTag.controller.js";

import { authenticate } from "../middlewares/auth.middleware.js";

import {
    addTagToArticleValidation,
    articleTagIdValidation,
} from "../middlewares/validations/articleTag.validation.js";

import { validate } from "../middlewares/validate.js";

const router = Router();

router.post(
    "/",
    authenticate,
    addTagToArticleValidation,
    validate,
    addTagToArticle
);

router.delete(
    "/:articleTagId",
    authenticate,
    articleTagIdValidation,
    validate,
    deleteTagFromArticle
);

export default router;