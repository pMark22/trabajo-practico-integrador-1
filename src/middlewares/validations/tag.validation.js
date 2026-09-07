import { body } from "express-validator";

export const createTagValidation = [
    body("name")
        .trim()
        .isLength({ min: 2, max: 30 })
        .withMessage("El nombre debe tener entre 2 y 30 caracteres"),
];

export const updateTagValidation = [
    body("name")
        .trim()
        .isLength({ min: 2, max: 30 })
        .withMessage("El nombre debe tener entre 2 y 30 caracteres"),
];