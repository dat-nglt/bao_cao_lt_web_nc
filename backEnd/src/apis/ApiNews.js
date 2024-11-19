import { typeNewsModel, newsModel, sequelize } from '../models/index.js'

const getAllNews = async (req, res) => {
    try {
        const news = await newsModel.findAll();
        res.json(news);
    } catch (error) {
        res.status(500).json({ message: 'Có lỗi xảy ra.' });
    }
}

export default { getAllNews};