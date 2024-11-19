<<<<<<< HEAD
import sequelize from '../configs/connectDB.js';
import newsModel from './NewsModels.js';
import typeNewsModel from './TypeNewsModels.js';
import userModel from './UserModels.js';
import bookModel from './BookModels.js';
import borrowModel from './BorrowModels.js';
import contactModel from "./ContactModels.js";
=======
import sequelize from '../configs/connectDB.js'
import newsModel from './NewsModels.js'
import typeNewsModel from './TypeNewsModels.js'
import userModel from './UserModels.js'
import bookModel from './BookModels.js'
import borrowModel from './BorrowModels.js'
import categoryModel from './CategoryModels.js'
>>>>>>> b984b4b16bd7f37ff420696bfae1fc0680dac26d

newsModel.belongsTo(typeNewsModel, { foreignKey: 'typeId', as: 'type_news' })
typeNewsModel.hasMany(newsModel, { foreignKey: 'typeId', as: 'news' })
borrowModel.belongsTo(userModel, { foreignKey: 'userId', as: 'user' })
borrowModel.belongsTo(bookModel, { foreignKey: 'bookId', as: 'book' })
userModel.hasMany(borrowModel, { foreignKey: 'userId', as: 'borrow' })
bookModel.hasMany(borrowModel, { foreignKey: 'bookId', as: 'borrow' })

<<<<<<< HEAD
export { newsModel, typeNewsModel, userModel, bookModel, borrowModel, contactModel, sequelize };
=======
export {
  newsModel,
  typeNewsModel,
  categoryModel,
  userModel,
  bookModel,
  borrowModel,
  sequelize
}
>>>>>>> b984b4b16bd7f37ff420696bfae1fc0680dac26d
