import { verifyToken } from "../helpers/jwt.helper.js";

export const authenticate = (req, res, next) => {
    try {
        const token = req.cookies.token;

        if (!token) {
            return res.status(401).json({
                message: "Token no proporcionado",
            });
        }

        const decoded = verifyToken(token);

        req.user = decoded;

        next();

    } catch (error) {
        return res.status(401).json({
            message: "Token inválido o expirado",
        });
    }
};