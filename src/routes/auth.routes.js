import { Router } from "express";

import { register, login } from "../controllers/auth.controller.js";
import {
    registerValidation,
    loginValidation,
} from "../middlewares/validations/user.validation.js";
import { validate } from "../middlewares/validate.js";

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

export default router;