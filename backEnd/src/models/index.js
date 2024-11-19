import sequelize from '../configs/connectDB.js'
import newsModel from './NewsModels.js'
import typeNewsModel from './TypeNewsModels.js'
import userModel from './UserModels.js'
import bookModel from './BookModels.js'
import borrowModel from './BorrowModels.js'
import categoryModel from './CategoryModels.js'

newsModel.belongsTo(typeNewsModel, { foreignKey: 'typeId', as: 'type_news' })
typeNewsModel.hasMany(newsModel, { foreignKey: 'typeId', as: 'news' })
borrowModel.belongsTo(userModel, { foreignKey: 'userId', as: 'user' })
userModel.hasMany(borrowModel, { foreignKey: 'userId', as: 'borrow' })
bookModel.hasMany(borrowModel, { foreignKey: 'bookId', as: 'borrow' })
borrowModel.belongsTo(bookModel, { foreignKey: 'bookId', as: 'book' })
categoryModel.hasMany(bookModel, { foreignKey: 'categoryId', as: 'books' });
bookModel.belongsTo(categoryModel, { foreignKey: 'categoryId', as: 'category' });

sequelize.sync({ alter: true })

export {
  newsModel,
  typeNewsModel,
  categoryModel,
  userModel,
  bookModel,
  borrowModel,
  sequelize
}
