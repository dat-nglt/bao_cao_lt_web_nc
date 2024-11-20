import { DataTypes } from "sequelize";
import sequelize from "../configs/connectDB.js";

const categoryModel = sequelize.define(
  "category",
  {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    description: {
      type: DataTypes.STRING,
    },
  },
  {
    timestamps: false,
  }
);

export default categoryModel;
