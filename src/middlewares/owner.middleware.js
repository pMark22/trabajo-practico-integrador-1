import { Article } from "../models/article.model.js";

export const ownerMiddleware = async (req, res, next) => {
    try {
        const article = await Article.findByPk(req.params.id);

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

        req.article = article;

        next();

    } catch (error) {
        console.error("Error al verificar propietario:", error);

        res.status(500).json({
            message: "Error al verificar propietario del artículo",
        });
    }
};