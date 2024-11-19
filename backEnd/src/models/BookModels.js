import { DataTypes } from 'sequelize'
import sequelize from '../configs/connectDB.js'

const bookModel = sequelize.define('book', {
  name: {
    type: DataTypes.STRING,
    allowNull: false
  },
  count: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  categoryId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'categories',
      key: 'id'
    }
  }
})

export default bookModel
