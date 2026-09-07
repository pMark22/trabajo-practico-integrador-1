import { User } from "../models/user.model.js";
import { Profile } from "../models/profile.model.js";

import {
    hashPassword,
    comparePassword,
} from "../helpers/bcript.helper.js";

import { generateToken } from "../helpers/jwt.helper.js";

export const register = async (req, res) => {
    try {
        const {
            username,
            email,
            password,
            first_name,
            last_name,
        } = req.body;

        const hashedPassword = await hashPassword(password);

        const user = await User.create({
            username,
            email,
            password: hashedPassword,
        });

        await Profile.create({
            user_id: user.id,
            first_name,
            last_name,
        });

        res.status(201).json({
            message: "Usuario registrado correctamente",
            user: {
                id: user.id,
                username: user.username,
                email: user.email,
                role: user.role,
            },
        });

    } catch (error) {
        console.error("Error al registrar usuario:", error);

        res.status(500).json({
            message: "Error al registrar usuario",
        });
    }
};

export const login = async (req, res) => {
    try {
        const { email, password } = req.body;

        const user = await User.findOne({
            where: { email },
        });

        if (!user) {
            return res.status(404).json({
                message: "Usuario no encontrado",
            });
        }

        const passwordCorrect = await comparePassword(
            password,
            user.password
        );

        if (!passwordCorrect) {
            return res.status(401).json({
                message: "Contraseña incorrecta",
            });
        }

        const token = generateToken({
            id: user.id,
            role: user.role,
        });

        res.cookie("token", token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "lax",
            maxAge: 60 * 60 * 1000,
        });

        res.status(200).json({
            message: "Inicio de sesión exitoso",
            user: {
                id: user.id,
                username: user.username,
                email: user.email,
                role: user.role,
            },
        });

    } catch (error) {
        console.error("Error al iniciar sesión:", error);

        res.status(500).json({
            message: "Error al iniciar sesión",
        });
    }
};

export const logout = async (req, res) => {
    try {
        res.clearCookie("token");

        res.status(200).json({
            message: "Sesión cerrada correctamente",
        });

    } catch (error) {
        console.error("Error al cerrar sesión:", error);

        res.status(500).json({
            message: "Error al cerrar sesión",
        });
    }
};