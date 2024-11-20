import { DataTypes } from "sequelize";
import sequelize from "../configs/connectDB.js";

const userModel = sequelize.define("user", {
  studentCode: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  passWord: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  fullName: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  dateOfBirth: {
    type: DataTypes.DATE,
  },
  addressUser: {
    type: DataTypes.STRING,
  },
  phoneNumber: {
    type: DataTypes.STRING,
    validate: {
      len: [10, 11], // Chiều dài từ 10 đến 15 ký tự
    },
  },
  email: {
    type: DataTypes.STRING,
  },
  identificationNumber: {
    type: DataTypes.STRING,
    validate: {
      len: [9, 12], // Chiều dài từ 9 đến 12 ký tự
    },
  },
  roleAccess: {
    type: DataTypes.INTEGER,
  },

},
{
  timestamps: false,
});

export default userModel;
