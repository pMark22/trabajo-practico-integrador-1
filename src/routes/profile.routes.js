import { Router } from "express";

import {
    getProfile,
    createProfile,
} from "../controllers/profile.controller.js";

import { authenticate } from "../middlewares/auth.middleware.js";

const router = Router();

router.get(
    "/",
    authenticate,
    getProfile
);

router.post(
    "/",
    authenticate,
    createProfile
);

export default router;