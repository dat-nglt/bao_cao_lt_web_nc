import { DataTypes } from 'sequelize';
import sequelize from '../configs/connectDB.js';

const FineModel = sequelize.define('fine',
    {
        id_borrow: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        amount: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        fineDate: {
            type: DataTypes.DATE,
            allowNull: false,
            defaultValue: DataTypes.NOW,
        },    
    },
    {
        timestamps: false,
    }
);

export default FineModel;