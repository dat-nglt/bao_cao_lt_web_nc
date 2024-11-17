import sequelize from '../configs/connectDB.js';
import newsModel from './NewsModels.js';
import typeNewsModel from './TypeNewsModels.js';

newsModel.belongsTo(typeNewsModel, { foreignKey: 'typeId', as: 'type_news' });
typeNewsModel.hasMany(newsModel, { foreignKey: 'typeId', as: 'news' });

export { newsModel, typeNewsModel, sequelize };