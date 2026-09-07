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