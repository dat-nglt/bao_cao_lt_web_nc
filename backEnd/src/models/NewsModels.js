import { DataTypes } from 'sequelize';
import sequelize from '../configs/connectDB.js';

const newsModel = sequelize.define('news', {
    title: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    image: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    content: {
        type: DataTypes.TEXT,
        allowNull: true,
    },
    typeId: {
        type: DataTypes.INTEGER,
        allowNull: true,
    },
});

export default newsModel;