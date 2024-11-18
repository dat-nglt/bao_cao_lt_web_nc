import { DataTypes } from 'sequelize';
import sequelize from '../configs/connectDB.js';

const borrowModel = sequelize.define('borrow', {
    dayReturn: {
        type: DataTypes.DATE,
        allowNull: false,
    },
    status: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    bookId: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    userId: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
});

export default borrowModel;