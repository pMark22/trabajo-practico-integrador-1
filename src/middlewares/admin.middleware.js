export const adminMiddleware = (req, res, next) => {
    if (req.user.role !== "admin") {
        return res.status(403).json({
            message: "No tienes autorización para realizar esta acción",
        });
    }

    next();
};