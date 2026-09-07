import { ArticleTag } from "../models/articleTag.model.js";
import { Article } from "../models/article.model.js";
import { Tag } from "../models/tag.model.js";

export const addTagToArticle = async (req, res) => {
    try {
        const { articleId } = req.params;
        const { tag_id } = req.body;

        const article = await Article.findByPk(articleId);

        if (!article) {
            return res.status(404).json({
                message: "Artículo no encontrado",
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
                article_id: articleId,
                tag_id,
            },
        });

        if (existingRelation) {
            return res.status(400).json({
                message: "La etiqueta ya está asociada al artículo",
            });
        }

        const relation = await ArticleTag.create({
            article_id: articleId,
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