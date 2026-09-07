import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser";

import { startDB, sequelize } from "./src/config/database.js";

import "./src/models/user.model.js";
import "./src/models/profile.model.js";
import "./src/models/article.model.js";
import "./src/models/tag.model.js";
import "./src/models/articleTag.model.js";

import authRoutes from "./src/routes/auth.routes.js";
import profileRoutes from "./src/routes/profile.routes.js";
import articleRoutes from "./src/routes/article.routes.js";
import tagRoutes from "./src/routes/tag.routes.js";
import articleTagRoutes from "./src/routes/articleTag.routes.js";

dotenv.config();

const app = express();

const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(cookieParser());
app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api/profile", profileRoutes);
app.use("/api/articles", articleRoutes);
app.use("/api/tags", tagRoutes);
app.use("/api/articles", articleTagRoutes);

const startServer = async () => {
    await startDB();
    await sequelize.sync();

    app.listen(PORT, () => {
        console.log(`Servidor corriendo en el puerto ${PORT}`);
    });
};

startServer();