import { Tag } from "../models/tag.model.js";

export const createTag = async (req, res) => {
    try {
        const { name } = req.body;

        const existingTag = await Tag.findOne({
            where: { name },
        });

        if (existingTag) {
            return res.status(400).json({
                message: "La etiqueta ya existe",
            });
        }

        const tag = await Tag.create({
            name,
        });

        res.status(201).json({
            message: "Etiqueta creada correctamente",
            tag,
        });
    } catch (error) {
        console.error("Error al crear etiqueta:", error);

        res.status(500).json({
            message: "Error al crear etiqueta",
        });
    }
};

export const getTags = async (req, res) => {
    try {
        const tags = await Tag.findAll();

        res.status(200).json(tags);
    } catch (error) {
        console.error("Error al obtener etiquetas:", error);

        res.status(500).json({
            message: "Error al obtener etiquetas",
        });
    }
};

export const getTagById = async (req, res) => {
    try {
        const { id } = req.params;

        const tag = await Tag.findByPk(id);

        if (!tag) {
            return res.status(404).json({
                message: "Etiqueta no encontrada",
            });
        }

        res.status(200).json(tag);
    } catch (error) {
        console.error("Error al obtener etiqueta:", error);

        res.status(500).json({
            message: "Error al obtener etiqueta",
        });
    }
};

export const updateTag = async (req, res) => {
    try {
        const { id } = req.params;
        const { name } = req.body;

        const tag = await Tag.findByPk(id);

        if (!tag) {
            return res.status(404).json({
                message: "Etiqueta no encontrada",
            });
        }

        const existingTag = await Tag.findOne({
            where: { name },
        });

        if (existingTag && existingTag.id !== tag.id) {
            return res.status(400).json({
                message: "La etiqueta ya existe",
            });
        }

        await tag.update({
            name,
        });

        res.status(200).json({
            message: "Etiqueta actualizada correctamente",
            tag,
        });
    } catch (error) {
        console.error("Error al actualizar etiqueta:", error);

        res.status(500).json({
            message: "Error al actualizar etiqueta",
        });
    }
};

export const deleteTag = async (req, res) => {
    try {
        const { id } = req.params;

        const tag = await Tag.findByPk(id);

        if (!tag) {
            return res.status(404).json({
                message: "Etiqueta no encontrada",
            });
        }

        await tag.destroy();

        res.status(200).json({
            message: "Etiqueta eliminada correctamente",
        });
    } catch (error) {
        console.error("Error al eliminar etiqueta:", error);

        res.status(500).json({
            message: "Error al eliminar etiqueta",
        });
    }
};