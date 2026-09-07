import { Sequelize } from "sequelize";
import dotenv from "dotenv";

dotenv.config();

export const sequelize = new Sequelize(
    process.env.DB_NAME,
    process.env.DB_USER,
    process.env.DB_PASSWORD,
    {
        host: process.env.DB_HOST,
        dialect: "mysql",
    }
);

export const startDB = async () => {
    try {
        await sequelize.authenticate();
        console.log("Conexión a la DB establecida correctamente");
    } catch (error) {
        console.error("No se pudo conectar a la DB:", error);
    }
};