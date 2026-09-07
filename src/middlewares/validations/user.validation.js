import { body } from "express-validator";

export const registerValidation = [
    body("username")
        .trim()
        .isLength({ min: 3, max: 20 })
        .withMessage("El username debe tener entre 3 y 20 caracteres"),

    body("email")
        .trim()
        .isEmail()
        .withMessage("El email no es válido"),

    body("password")
        .isLength({ min: 6 })
        .withMessage("La contraseña debe tener al menos 6 caracteres"),
];

export const loginValidation = [
    body("email")
        .trim()
        .isEmail()
        .withMessage("El email no es válido"),

    body("password")
        .notEmpty()
        .withMessage("La contraseña es obligatoria"),
];