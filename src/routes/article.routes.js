import { Router } from "express";

import { createArticle } from "../controllers/article.controller.js";
import { authenticate } from "../middlewares/auth.middleware.js";

const router = Router();

router.post(
    "/",
    authenticate,
    createArticle
);

export default router;