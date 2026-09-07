import { Router } from "express";

import { createTag } from "../controllers/tag.controller.js";
import { authenticate } from "../middlewares/auth.middleware.js";

const router = Router();

router.post(
    "/",
    authenticate,
    createTag
);

export default router;