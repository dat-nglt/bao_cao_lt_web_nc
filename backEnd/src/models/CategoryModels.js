import { DataTypes } from "sequelize";
import sequelize from "../configs/connectDB.js";

const categoryModel = sequelize.define(
  "category",
  {
    idCategory: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
  },
    nameCategory: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    tableName: "category",
    timestamps: false,
  }
);

export default categoryModel;
