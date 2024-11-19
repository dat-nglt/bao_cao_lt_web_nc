import { DataTypes } from 'sequelize';
import sequelize from '../configs/connectDB.js';

const ContactModel = sequelize.define('contact', {
    name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            isEmail: true,
        },
    },
    tel: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            is: /^[0-9\-\+\s\(\)]+$/i,
        },
    },
    description: {
        type: DataTypes.TEXT,
        allowNull: false,
    },
    timeContact: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW,
    },    
});

export default ContactModel;