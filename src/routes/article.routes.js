import { Router } from "express";

import {
    createArticle,
    getArticles,
    getArticleById,
    updateArticle,
    deleteArticle,
} from "../controllers/article.controller.js";

import { authenticate } from "../middlewares/auth.middleware.js";
import { ownerMiddleware } from "../middlewares/owner.middleware.js";

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
    ownerMiddleware,
    updateArticleValidation,
    validate,
    updateArticle
);

router.delete(
    "/:id",
    authenticate,
    ownerMiddleware,
    deleteArticle
);

export default router;