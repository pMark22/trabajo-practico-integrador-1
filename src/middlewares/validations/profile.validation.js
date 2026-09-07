import { body } from "express-validator";

export const updateProfileValidation = [
    body("first_name")
        .optional()
        .trim()
        .isLength({ min: 2, max: 50 })
        .withMessage("El nombre debe tener entre 2 y 50 caracteres")
        .matches(/^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/)
        .withMessage("El nombre solo puede contener letras"),

    body("last_name")
        .optional()
        .trim()
        .isLength({ min: 2, max: 50 })
        .withMessage("El apellido debe tener entre 2 y 50 caracteres")
        .matches(/^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/)
        .withMessage("El apellido solo puede contener letras"),

    body("biography")
        .optional()
        .trim()
        .isLength({ max: 500 })
        .withMessage("La biografía no puede superar los 500 caracteres"),

    body("avatar_url")
        .optional()
        .trim()
        .isURL()
        .withMessage("El avatar debe ser una URL válida"),

    body("birth_date")
        .optional()
        .isDate()
        .withMessage("La fecha de nacimiento no es válida"),
];