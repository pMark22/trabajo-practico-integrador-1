import { Router } from "express";

import {
    createArticle,
    getArticles,
    getArticleById,
    updateArticle,
    deleteArticle,
} from "../controllers/article.controller.js";

import { authenticate } from "../middlewares/auth.middleware.js";
import {
    createArticleValidation,
    updateArticleValidation,
} from "../middlewares/validations/article.validation.js";
import { validate } from "../middlewares/validate.js";

const router = Router();

router.post(
    "/",
    authenticate,
    createArticleValidation,
    validate,
    createArticle
);

router.get(
    "/",
    authenticate,
    getArticles
);

router.get(
    "/:id",
    authenticate,
    getArticleById
);

router.put(
    "/:id",
    authenticate,
    updateArticleValidation,
    validate,
    updateArticle
);

router.delete(
    "/:id",
    authenticate,
    deleteArticle
);

export default router;