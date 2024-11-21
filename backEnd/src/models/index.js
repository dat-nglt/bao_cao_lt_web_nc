import sequelize from "../configs/connectDB.js";
import newsModel from "./NewsModels.js";
import typeNewsModel from "./TypeNewsModels.js";
import userModel from "./UserModels.js";
import bookModel from "./BookModels.js";
import borrowModel from "./BorrowModels.js";
import contactModel from "./ContactModels.js";
import fineModel from "./FineModels.js";
import categoryModel from "./CategoryModels.js";
import favoriteBookModel from "./FavouriteBookModels.js";

newsModel.belongsTo(typeNewsModel, { foreignKey: "typeId", as: "type_news" });
typeNewsModel.hasMany(newsModel, { foreignKey: "typeId", as: "news" });
borrowModel.belongsTo(userModel, { foreignKey: "userId", as: "user" });
borrowModel.belongsTo(bookModel, { foreignKey: "bookId", as: "book" });
userModel.hasMany(borrowModel, { foreignKey: "userId", as: "borrow" });
bookModel.hasMany(borrowModel, { foreignKey: "bookId", as: "borrow" });
fineModel.belongsTo(borrowModel, { foreignKey: "id_borrow", as: "borrow" });
borrowModel.hasMany(fineModel, { foreignKey: "id_borrow", as: "fines" });
bookModel.belongsTo(categoryModel, {
  foreignKey: "categoryId",
  as: "category",
});
categoryModel.hasMany(bookModel, { foreignKey: "categoryId", as: "category" });

favoriteBookModel.belongsTo(userModel, { foreignKey: "userId", as: "user" });
favoriteBookModel.belongsTo(bookModel, { foreignKey: "bookId", as: "book" });
userModel.hasMany(favoriteBookModel, { foreignKey: "userId", as: "favoriteBooks" });
bookModel.hasMany(favoriteBookModel, { foreignKey: "bookId", as: "favoritedBy" });


export {
  newsModel,
  typeNewsModel,
  userModel,
  bookModel,
  borrowModel,
  contactModel,
  fineModel,
  categoryModel,
  favoriteBookModel,
  sequelize,
};
