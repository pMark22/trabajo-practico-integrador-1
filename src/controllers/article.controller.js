import { Article } from "../models/article.model.js";
import { User } from "../models/user.model.js";

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
        const articles = await Article.findAll({
            where: {
                status: "published",
            },
        });

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

export const getArticlesByUser = async (req, res) => {
    try {
        const { userId } = req.params;

        const user = await User.findByPk(userId);

        if (!user) {
            return res.status(404).json({
                message: "Usuario no encontrado",
            });
        }

        const articles = await Article.findAll({
            where: {
                user_id: userId,
            },
        });

        res.status(200).json(articles);

    } catch (error) {
        console.error("Error al obtener artículos del usuario:", error);

        res.status(500).json({
            message: "Error al obtener artículos del usuario",
        });
    }
};

export const getArticleByUser = async (req, res) => {
    try {
        const {
            userId,
            id,
        } = req.params;

        const user = await User.findByPk(userId);

        if (!user) {
            return res.status(404).json({
                message: "Usuario no encontrado",
            });
        }

        const article = await Article.findOne({
            where: {
                id,
                user_id: userId,
            },
        });

        if (!article) {
            return res.status(404).json({
                message: "Artículo no encontrado para este usuario",
            });
        }

        res.status(200).json(article);

    } catch (error) {
        console.error("Error al obtener artículo del usuario:", error);

        res.status(500).json({
            message: "Error al obtener artículo del usuario",
        });
    }
};

export const updateArticle = async (req, res) => {
    try {
        const {
            title,
            content,
            excerpt,
            status,
        } = req.body;

        const article = req.article;

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

export const deleteArticle = async (req, res) => {
    try {
        const article = req.article;

        await article.destroy();

        res.status(200).json({
            message: "Artículo eliminado correctamente",
        });

    } catch (error) {
        console.error("Error al eliminar artículo:", error);

        res.status(500).json({
            message: "Error al eliminar artículo",
        });
    }
};