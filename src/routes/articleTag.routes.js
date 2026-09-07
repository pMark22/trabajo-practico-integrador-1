import { Router } from "express";

import { addTagToArticle } from "../controllers/articleTag.controller.js";

import { authenticate } from "../middlewares/auth.middleware.js";

const router = Router();

router.post(
    "/:articleId/tags",
    authenticate,
    addTagToArticle
);

export default router;