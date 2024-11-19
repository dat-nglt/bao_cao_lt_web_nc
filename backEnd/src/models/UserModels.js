
import { DataTypes } from 'sequelize';
import sequelize from '../configs/connectDB.js';

const userModel = sequelize.define('user', {
    studentCode: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
    },
    fullName: {
        type: DataTypes.STRING,
        allowNull: false,
    },
});

export default userModel;