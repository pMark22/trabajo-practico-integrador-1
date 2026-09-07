import { DataTypes } from "sequelize";
import { sequelize } from "../config/database.js";
import { Article } from "./article.model.js";

export const User = sequelize.define(
    "User",
    {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },

        username: {
            type: DataTypes.STRING(20),
            allowNull: false,
            unique: true,
        },

        email: {
            type: DataTypes.STRING(100),
            allowNull: false,
            unique: true,
        },

        password: {
            type: DataTypes.STRING(255),
            allowNull: false,
        },

        role: {
            type: DataTypes.ENUM("user", "admin"),
            allowNull: false,
            defaultValue: "user",
        },
    },
    {
        tableName: "users",
        createdAt: "created_at",
        updatedAt: "updated_at",
        deletedAt: "deleted_at",
        paranoid: true,
    }
);

// Relaciones

// Relación uno a muchos
User.hasMany(Article, {
    foreignKey: "user_id",
    as: "articles",
    onDelete: "CASCADE",
});

// Relación inversa de Article
Article.belongsTo(User, {
    foreignKey: "user_id",
    as: "author",
});