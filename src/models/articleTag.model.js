import { DataTypes } from "sequelize";
import { sequelize } from "../config/database.js";
import { Article } from "./article.model.js";
import { Tag } from "./tag.model.js";

export const ArticleTag = sequelize.define(
    "ArticleTag",
    {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },

        article_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },

        tag_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
    },
    {
        tableName: "article_tags",
        createdAt: "created_at",
        updatedAt: "updated_at",
    }
);

// Relaciones
Article.belongsToMany(Tag, {
    through: ArticleTag,
    foreignKey: "article_id",
    as: "tags",
});

Tag.belongsToMany(Article, {
    through: ArticleTag,
    foreignKey: "tag_id",
    as: "articles",
});