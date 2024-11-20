import { DataTypes } from "sequelize";
import sequelize from "../configs/connectDB.js";

const bookModel = sequelize.define("book", {
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  count: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  imgBook: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  creatorBook: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  publisherBook: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  dateBook: {
    type: DataTypes.DATE,
    allowNull: true,
  },
  desBook: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  categoryId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: "categories",
      key: "id",
    },
  },
},{
  timestamps: false,
});

export default bookModel;
