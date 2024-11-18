import { DataTypes } from 'sequelize';
import sequelize from '../configs/connectDB.js';

const borrowModel = sequelize.define('borrow', {
    dueDate: {
        type: DataTypes.DATE,
        allowNull: false,
    },
    dayReturn: {
        type: DataTypes.DATE,
        allowNull: true,
    },
    status: {
        type: DataTypes.INTEGER,
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