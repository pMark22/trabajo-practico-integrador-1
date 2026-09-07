import { body, param } from "express-validator";

export const addTagToArticleValidation = [
    body("article_id")
        .isInt()
        .withMessage("El ID del artículo debe ser un número entero"),

    body("tag_id")
        .isInt()
        .withMessage("El ID de la etiqueta debe ser un número entero"),
];

export const articleTagIdValidation = [
    param("articleTagId")
        .isInt()
        .withMessage("El ID de la asociación debe ser un número entero"),
];