import express from "express";
import dotenv from "dotenv";
import { startDB } from "./src/config/database.js";

dotenv.config();

const app = express();

const PORT = process.env.PORT || 3000;

const startServer = async () => {
    await startDB();

    app.listen(PORT, () => {
        console.log(`Servidor corriendo en el puerto ${PORT}`);
    });
};

startServer();