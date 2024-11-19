import { typeNewsModel, sequelize } from '../models/index.js'

const getAllTypeNews = async (req, res) => {
    try {
        const news = await typeNewsModel.findAll();
        res.json(news);
    } catch (error) {
        res.status(500).json({ message: 'Có lỗi xảy ra.' });
    }
}

export default { getAllTypeNews };