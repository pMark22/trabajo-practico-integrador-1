import { Profile } from "../models/profile.model.js";

export const getProfile = async (req, res) => {
    try {
        const profile = await Profile.findOne({
            where: {
                user_id: req.user.id,
            },
        });

        if (!profile) {
            return res.status(404).json({
                message: "Perfil no encontrado",
            });
        }

        res.status(200).json(profile);

    } catch (error) {
        console.error("Error al obtener perfil:", error);

        res.status(500).json({
            message: "Error al obtener perfil",
        });
    }
};

export const createProfile = async (req, res) => {
    try {
        const { first_name, last_name, biography, avatar_url, birth_date } = req.body;

        const existingProfile = await Profile.findOne({
            where: {
                user_id: req.user.id,
            },
        });

        if (existingProfile) {
            return res.status(409).json({
                message: "El usuario ya tiene un perfil",
            });
        }

        const profile = await Profile.create({
            user_id: req.user.id,
            first_name,
            last_name,
            biography,
            avatar_url,
            birth_date,
        });

        res.status(201).json({
            message: "Perfil creado correctamente",
            profile,
        });

    } catch (error) {
        console.error("Error al crear perfil:", error);

        res.status(500).json({
            message: "Error al crear perfil",
        });
    }
};