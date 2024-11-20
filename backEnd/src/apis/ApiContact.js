import { contactModel, sequelize } from '../models/index.js';
const { Op } = require('sequelize');

const getAllContact = async (req, res) => {
    try {
        const contacts = await contactModel.findAll();
        res.status(200).json({
            message: 'lấy thành công',
            data: contacts,
        });
    } catch (error) {
        res.status(500).json({
            message: 'Lỗi khi lấy danh sách liên hệ',
            error: error.message,
        });
    }
};

const createContact = async (req, res) => {
    try {
        const { name, email, tel, des} = req.body;

        if (!name || !email || !tel || !description) {
            return res.status(400).json({
                message: 'Vui lòng cung cấp đầy đủ thông tin (name, email, tel, description)',
            });
        }
        const newContact = await contactModel.create({
            name,
            email,
            tel,
            description:des,
            timeContact: timeContact || new Date(),
        });

        res.status(201).json({
            message: 'Tạo liên hệ mới thành công',
            data: newContact,
        });
    } catch (error) {
        res.status(500).json({
            message: 'Lỗi khi tạo liên hệ mới',
            error: error.message,
        });
    }
};


export default { getAllContact };
