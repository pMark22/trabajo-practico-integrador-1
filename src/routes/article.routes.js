import { Router } from "express";

import {
    createArticle,
    getArticles,
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

export default router;