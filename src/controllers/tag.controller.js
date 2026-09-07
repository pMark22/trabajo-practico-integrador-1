import { Tag } from "../models/tag.model.js";

export const createTag = async (req, res) => {
    try {
        const { name } = req.body;

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