import { typeNewsModel, newsModel, sequelize } from '../models/index.js'
const { Op } = require('sequelize');

const getAllNews = async (req, res) => {
    try {
        const { type, title } = req.query
        const whereConditions = {
            title: {
              [Op.like]: `%${title}%`
            }
          }
          if (type !== '') {
            whereConditions.typeId = type
          }
        const news = await newsModel.findAll({
            where: whereConditions,
            include: [
                {
                  model: typeNewsModel,
                  as: 'type_news',
                  attributes: []
                }
            ]
        });
        res.json(news);
    } catch (error) {
        res.status(400).json({ message: 'Có lỗi xảy ra.' });
    }
}

export default { getAllNews };