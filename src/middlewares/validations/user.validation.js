import { body, param } from "express-validator";

export const registerValidation = [
    body("username")
        .trim()
        .isLength({ min: 3, max: 20 })
        .withMessage("El username debe tener entre 3 y 20 caracteres")
        .matches(/^[a-zA-Z0-9]+$/)
        .withMessage("El username solo puede contener letras y números"),

    body("email")
        .trim()
        .isEmail()
        .withMessage("El email no es válido"),

    body("password")
        .isLength({ min: 8 })
        .withMessage("La contraseña debe tener al menos 8 caracteres")
        .matches(/[A-Z]/)
        .withMessage("La contraseña debe contener al menos una letra mayúscula")
        .matches(/[a-z]/)
        .withMessage("La contraseña debe contener al menos una letra minúscula")
        .matches(/[0-9]/)
        .withMessage("La contraseña debe contener al menos un número"),

    body("first_name")
        .trim()
        .isLength({ min: 2, max: 50 })
        .withMessage("El nombre debe tener entre 2 y 50 caracteres")
        .matches(/^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/)
        .withMessage("El nombre solo puede contener letras"),

    body("last_name")
        .trim()
        .isLength({ min: 2, max: 50 })
        .withMessage("El apellido debe tener entre 2 y 50 caracteres")
        .matches(/^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/)
        .withMessage("El apellido solo puede contener letras"),
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

export const createUserValidation = [
    body("username")
        .trim()
        .isLength({ min: 3, max: 20 })
        .withMessage("El username debe tener entre 3 y 20 caracteres")
        .matches(/^[a-zA-Z0-9]+$/)
        .withMessage("El username solo puede contener letras y números"),

    body("email")
        .trim()
        .isEmail()
        .withMessage("El email no es válido"),

    body("password")
        .isLength({ min: 8 })
        .withMessage("La contraseña debe tener al menos 8 caracteres")
        .matches(/[A-Z]/)
        .withMessage("La contraseña debe contener al menos una letra mayúscula")
        .matches(/[a-z]/)
        .withMessage("La contraseña debe contener al menos una letra minúscula")
        .matches(/[0-9]/)
        .withMessage("La contraseña debe contener al menos un número"),

    body("role")
        .optional()
        .isIn(["user", "admin"])
        .withMessage("El rol debe ser user o admin"),

    body("first_name")
        .trim()
        .isLength({ min: 2, max: 50 })
        .withMessage("El nombre debe tener entre 2 y 50 caracteres")
        .matches(/^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/)
        .withMessage("El nombre solo puede contener letras"),

    body("last_name")
        .trim()
        .isLength({ min: 2, max: 50 })
        .withMessage("El apellido debe tener entre 2 y 50 caracteres")
        .matches(/^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/)
        .withMessage("El apellido solo puede contener letras"),
];

export const updateUserValidation = [
    param("id")
        .isInt()
        .withMessage("El ID del usuario debe ser un número entero"),

    body("username")
        .trim()
        .isLength({ min: 3, max: 20 })
        .withMessage("El username debe tener entre 3 y 20 caracteres")
        .matches(/^[a-zA-Z0-9]+$/)
        .withMessage("El username solo puede contener letras y números"),

    body("email")
        .trim()
        .isEmail()
        .withMessage("El email no es válido"),

    body("password")
        .optional()
        .isLength({ min: 8 })
        .withMessage("La contraseña debe tener al menos 8 caracteres")
        .matches(/[A-Z]/)
        .withMessage("La contraseña debe contener al menos una letra mayúscula")
        .matches(/[a-z]/)
        .withMessage("La contraseña debe contener al menos una letra minúscula")
        .matches(/[0-9]/)
        .withMessage("La contraseña debe contener al menos un número"),

    body("role")
        .isIn(["user", "admin"])
        .withMessage("El rol debe ser user o admin"),

    body("first_name")
        .trim()
        .isLength({ min: 2, max: 50 })
        .withMessage("El nombre debe tener entre 2 y 50 caracteres")
        .matches(/^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/)
        .withMessage("El nombre solo puede contener letras"),

    body("last_name")
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

export const userIdValidation = [
    param("id")
        .isInt()
        .withMessage("El ID del usuario debe ser un número entero"),
];