import { Article } from "../models/article.model.js";

export const createArticle = async (req, res) => {
    try {
        const {
            title,
            content,
            excerpt,
            status,
        } = req.body;

        const article = await Article.create({
            title,
            content,
            excerpt,
            status,
            user_id: req.user.id,
        });

        res.status(201).json({
            message: "Artículo creado correctamente",
            article,
        });

    } catch (error) {
        console.error("Error al crear artículo:", error);

        res.status(500).json({
            message: "Error al crear artículo",
        });
    }
};

export const getArticles = async (req, res) => {
    try {
        const articles = await Article.findAll();

        res.status(200).json(articles);

    } catch (error) {
        console.error("Error al obtener artículos:", error);

        res.status(500).json({
            message: "Error al obtener artículos",
        });
    }
};

export const getArticleById = async (req, res) => {
    try {
        const { id } = req.params;

        const article = await Article.findByPk(id);

        if (!article) {
            return res.status(404).json({
                message: "Artículo no encontrado",
            });
        }

        res.status(200).json(article);

    } catch (error) {
        console.error("Error al obtener artículo:", error);

        res.status(500).json({
            message: "Error al obtener artículo",
        });
    }
};

export const updateArticle = async (req, res) => {
    try {
        const { id } = req.params;

        const {
            title,
            content,
            excerpt,
            status,
        } = req.body;

        const article = await Article.findByPk(id);

        if (!article) {
            return res.status(404).json({
                message: "Artículo no encontrado",
            });
        }

        await article.update({
            title,
            content,
            excerpt,
            status,
        });

        res.status(200).json({
            message: "Artículo actualizado correctamente",
            article,
        });

    } catch (error) {
        console.error("Error al actualizar artículo:", error);

        res.status(500).json({
            message: "Error al actualizar artículo",
        });
    }
};