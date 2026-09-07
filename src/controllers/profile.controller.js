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