import { body, param } from "express-validator";

export const createTagValidation = [
    body("name")
        .trim()
        .isLength({ min: 2, max: 30 })
        .withMessage("El nombre debe tener entre 2 y 30 caracteres")
        .matches(/^[a-zA-ZáéíóúÁÉÍÓÚñÑ0-9_-]+$/)
        .withMessage("El nombre no puede contener espacios"),
];

export const updateTagValidation = [
    param("id")
        .isInt()
        .withMessage("El ID de la etiqueta debe ser un número entero"),

    body("name")
        .trim()
        .isLength({ min: 2, max: 30 })
        .withMessage("El nombre debe tener entre 2 y 30 caracteres")
        .matches(/^[a-zA-ZáéíóúÁÉÍÓÚñÑ0-9_-]+$/)
        .withMessage("El nombre no puede contener espacios"),
];

export const tagIdValidation = [
    param("id")
        .isInt()
        .withMessage("El ID de la etiqueta debe ser un número entero"),
];