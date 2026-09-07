import { ArticleTag } from "../models/articleTag.model.js";
import { Article } from "../models/article.model.js";
import { Tag } from "../models/tag.model.js";

export const addTagToArticle = async (req, res) => {
    try {
        const {
            article_id,
            tag_id,
        } = req.body;

        const article = await Article.findByPk(article_id);

        if (!article) {
            return res.status(404).json({
                message: "Artículo no encontrado",
            });
        }

        if (
            req.user.role !== "admin" &&
            article.user_id !== req.user.id
        ) {
            return res.status(403).json({
                message: "No tienes autorización para modificar este artículo",
            });
        }

        const tag = await Tag.findByPk(tag_id);

        if (!tag) {
            return res.status(404).json({
                message: "Etiqueta no encontrada",
            });
        }

        const existingRelation = await ArticleTag.findOne({
            where: {
                article_id,
                tag_id,
            },
        });

        if (existingRelation) {
            return res.status(400).json({
                message: "La etiqueta ya está asociada al artículo",
            });
        }

        const relation = await ArticleTag.create({
            article_id,
            tag_id,
        });

        res.status(201).json({
            message: "Etiqueta asociada al artículo correctamente",
            relation,
        });

    } catch (error) {
        console.error("Error al asociar etiqueta:", error);

        res.status(500).json({
            message: "Error al asociar etiqueta al artículo",
        });
    }
};

export const deleteTagFromArticle = async (req, res) => {
    try {
        const { articleTagId } = req.params;

        const relation = await ArticleTag.findByPk(articleTagId);

        if (!relation) {
            return res.status(404).json({
                message: "Asociación entre artículo y etiqueta no encontrada",
            });
        }

        const article = await Article.findByPk(relation.article_id);

        if (!article) {
            return res.status(404).json({
                message: "Artículo no encontrado",
            });
        }

        if (
            req.user.role !== "admin" &&
            article.user_id !== req.user.id
        ) {
            return res.status(403).json({
                message: "No tienes autorización para modificar este artículo",
            });
        }

        await relation.destroy();

        res.status(200).json({
            message: "Etiqueta desvinculada del artículo correctamente",
        });

    } catch (error) {
        console.error("Error al desvincular etiqueta:", error);

        res.status(500).json({
            message: "Error al desvincular etiqueta del artículo",
        });
    }
};