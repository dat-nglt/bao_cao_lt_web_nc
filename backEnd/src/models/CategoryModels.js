import { DataTypes } from 'sequelize'
import sequelize from '../configs/connectDB.js';

const categoryModel = sequelize.define('category', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false
  },
  description: {
    type: DataTypes.STRING
  }
})

export default categoryModel
