import { Router } from "express";

import {
    getUsers,
    getUserById,
    createUser,
    updateUser,
    deleteUser,
} from "../controllers/user.controller.js";

import { authenticate } from "../middlewares/auth.middleware.js";
import { adminMiddleware } from "../middlewares/admin.middleware.js";

import {
    createUserValidation,
    updateUserValidation,
    userIdValidation,
} from "../middlewares/validations/user.validation.js";

import { validate } from "../middlewares/validate.js";

const router = Router();

router.get(
    "/",
    authenticate,
    adminMiddleware,
    getUsers
);

router.get(
    "/:id",
    authenticate,
    adminMiddleware,
    userIdValidation,
    validate,
    getUserById
);

router.post(
    "/",
    authenticate,
    adminMiddleware,
    createUserValidation,
    validate,
    createUser
);

router.put(
    "/:id",
    authenticate,
    adminMiddleware,
    updateUserValidation,
    validate,
    updateUser
);

router.delete(
    "/:id",
    authenticate,
    adminMiddleware,
    userIdValidation,
    validate,
    deleteUser
);

export default router;