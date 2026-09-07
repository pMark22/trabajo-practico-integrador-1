import bcrypt from "bcrypt";
import { User } from "../models/user.model.js";

export const register = async (req, res) => {
    try {
        const { username, email, password } = req.body;

        const hashedPassword = await bcrypt.hash(password, 10);

        const user = await User.create({
            username,
            email,
            password: hashedPassword,
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