import { Router } from "express";

import {
    createArticle,
    getArticles,
    getArticleById,
    updateArticle,
} from "../controllers/article.controller.js";

import { authenticate } from "../middlewares/auth.middleware.js";

const router = Router();

router.post(
    "/",
    authenticate,
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
    updateArticle
);

export default router;