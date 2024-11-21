import { DataTypes } from "sequelize";
import sequelize from "../configs/connectDB.js";

const favoriteBookModel = sequelize.define("favoriteBook", {
  userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
  },
  bookId: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
},{
  timestamps: false,
});

export default favoriteBookModel;
