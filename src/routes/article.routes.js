import { Router } from "express";

import {
    createArticle,
    getArticles,
    getArticleById,
    getArticlesByUser,
    getArticleByUser,
    updateArticle,
    deleteArticle,
} from "../controllers/article.controller.js";

import { authenticate } from "../middlewares/auth.middleware.js";
import { ownerMiddleware } from "../middlewares/owner.middleware.js";

import {
    createArticleValidation,
    updateArticleValidation,
    articleIdValidation,
    userArticleIdValidation,
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
    "/user/:userId",
    authenticate,
    userArticleIdValidation,
    validate,
    getArticlesByUser
);

router.get(
    "/user/:userId/:id",
    authenticate,
    userArticleIdValidation,
    validate,
    getArticleByUser
);

router.get(
    "/:id",
    authenticate,
    articleIdValidation,
    validate,
    getArticleById
);

router.put(
    "/:id",
    authenticate,
    articleIdValidation,
    validate,
    ownerMiddleware,
    updateArticleValidation,
    validate,
    updateArticle
);

router.delete(
    "/:id",
    authenticate,
    articleIdValidation,
    validate,
    ownerMiddleware,
    deleteArticle
);

export default router;