import { User } from "../models/user.model.js";
import { Profile } from "../models/profile.model.js";
import { hashPassword } from "../helpers/bcript.helper.js";

export const getUsers = async (req, res) => {
    try {
        const users = await User.findAll({
            include: {
                model: Profile,
                as: "profile",
            },
            attributes: {
                exclude: ["password"],
            },
        });

        res.status(200).json(users);
    } catch (error) {
        console.error("Error al obtener usuarios:", error);

        res.status(500).json({
            message: "Error al obtener usuarios",
        });
    }
};

export const getUserById = async (req, res) => {
    try {
        const { id } = req.params;

        const user = await User.findByPk(id, {
            include: {
                model: Profile,
                as: "profile",
            },
            attributes: {
                exclude: ["password"],
            },
        });

        if (!user) {
            return res.status(404).json({
                message: "Usuario no encontrado",
            });
        }

        res.status(200).json(user);
    } catch (error) {
        console.error("Error al obtener usuario:", error);

        res.status(500).json({
            message: "Error al obtener usuario",
        });
    }
};

export const createUser = async (req, res) => {
    try {
        const {
            username,
            email,
            password,
            role,
            first_name,
            last_name,
        } = req.body;

        const existingUsername = await User.findOne({
            where: { username },
        });

        if (existingUsername) {
            return res.status(400).json({
                message: "El username ya está registrado",
            });
        }

        const existingEmail = await User.findOne({
            where: { email },
        });

        if (existingEmail) {
            return res.status(400).json({
                message: "El email ya está registrado",
            });
        }

        const hashedPassword = await hashPassword(password);

        const user = await User.create({
            username,
            email,
            password: hashedPassword,
            role,
        });

        await Profile.create({
            user_id: user.id,
            first_name,
            last_name,
        });

        res.status(201).json({
            message: "Usuario creado correctamente",
            user: {
                id: user.id,
                username: user.username,
                email: user.email,
                role: user.role,
            },
        });
    } catch (error) {
        console.error("Error al crear usuario:", error);

        res.status(500).json({
            message: "Error al crear usuario",
        });
    }
};

export const updateUser = async (req, res) => {
    try {
        const { id } = req.params;

        const {
            username,
            email,
            password,
            role,
            first_name,
            last_name,
            biography,
            avatar_url,
            birth_date,
        } = req.body;

        const user = await User.findByPk(id);

        if (!user) {
            return res.status(404).json({
                message: "Usuario no encontrado",
            });
        }

        const existingUsername = await User.findOne({
            where: { username },
        });

        if (existingUsername && existingUsername.id !== user.id) {
            return res.status(400).json({
                message: "El username ya está registrado",
            });
        }

        const existingEmail = await User.findOne({
            where: { email },
        });

        if (existingEmail && existingEmail.id !== user.id) {
            return res.status(400).json({
                message: "El email ya está registrado",
            });
        }

        const updatedData = {
            username,
            email,
            role,
        };

        if (password) {
            updatedData.password = await hashPassword(password);
        }

        await user.update(updatedData);

        const profile = await Profile.findOne({
            where: {
                user_id: user.id,
            },
        });

        if (!profile) {
            return res.status(404).json({
                message: "Perfil del usuario no encontrado",
            });
        }

        await profile.update({
            first_name,
            last_name,
            biography,
            avatar_url,
            birth_date,
        });

        res.status(200).json({
            message: "Usuario actualizado correctamente",
            user: {
                id: user.id,
                username: user.username,
                email: user.email,
                role: user.role,
            },
            profile,
        });
    } catch (error) {
        console.error("Error al actualizar usuario:", error);

        res.status(500).json({
            message: "Error al actualizar usuario",
        });
    }
};

export const deleteUser = async (req, res) => {
    try {
        const { id } = req.params;

        const user = await User.findByPk(id);

        if (!user) {
            return res.status(404).json({
                message: "Usuario no encontrado",
            });
        }

        await user.destroy();

        res.status(200).json({
            message: "Usuario eliminado correctamente",
        });
    } catch (error) {
        console.error("Error al eliminar usuario:", error);

        res.status(500).json({
            message: "Error al eliminar usuario",
        });
    }
};