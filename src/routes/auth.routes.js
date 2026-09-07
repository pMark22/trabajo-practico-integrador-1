import { Router } from "express";

import {
    register,
    login,
} from "../controllers/auth.controller.js";

import {
    getProfile,
    updateProfile,
} from "../controllers/profile.controller.js";

import {
    registerValidation,
    loginValidation,
} from "../middlewares/validations/user.validation.js";

import { validate } from "../middlewares/validate.js";
import { authenticate } from "../middlewares/auth.middleware.js";

const router = Router();

router.post(
    "/register",
    registerValidation,
    validate,
    register
);

router.post(
    "/login",
    loginValidation,
    validate,
    login
);

router.get(
    "/profile",
    authenticate,
    getProfile
);

router.put(
    "/profile",
    authenticate,
    updateProfile
);

export default router;