// models/TypeNewsModels.js
import { DataTypes } from 'sequelize';
import sequelize from '../configs/connectDB.js';

const typeNewsModel = sequelize.define('type_news', {
    name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
});

export default typeNewsModel;