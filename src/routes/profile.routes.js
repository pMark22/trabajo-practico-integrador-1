import { Router } from "express";

import {
    getProfile,
    createProfile,
    updateProfile,
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

router.put(
    "/",
    authenticate,
    updateProfile
);

export default router;