import sequelize from '../configs/connectDB.js';
import newsModel from './NewsModels.js';
import typeNewsModel from './TypeNewsModels.js';

typeNewsModel.hasMany(newsModel, {
    foreignKey: 'typeId',
});
newsModel.belongsTo(typeNewsModel, {
    foreignKey: 'typeId',
});

export { newsModel, typeNewsModel, sequelize };