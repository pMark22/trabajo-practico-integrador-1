import express from "express";
import dotenv from "dotenv";
import { startDB, sequelize } from "./src/config/database.js";
import "./src/models/user.model.js";
import "./src/models/user.model.js";
import "./src/models/profile.model.js";
import "./src/models/article.model.js";
import "./src/models/tag.model.js";

dotenv.config();

const app = express();

const PORT = process.env.PORT || 3000;

const startServer = async () => {
    await startDB();
    await sequelize.sync();

    app.listen(PORT, () => {
        console.log(`Servidor corriendo en el puerto ${PORT}`);
    });
};

startServer();