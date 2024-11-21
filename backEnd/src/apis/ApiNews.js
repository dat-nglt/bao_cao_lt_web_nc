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
          raw: true,
            where: whereConditions,
            attributes: {
              include: [
                [sequelize.fn('DATE_FORMAT', sequelize.col('news.createdAt'), '%d-%m-%Y'), 'dayCreated'],
              ]
            },
            include: [
                {
                  model: typeNewsModel,
                  as: 'type_news',
                  attributes: []
                }
            ],
            order: [['id', 'desc']],
        });
        res.json(news);
    } catch (error) {
        res.status(400).json({ message: 'Có lỗi xảy ra.' });
    }
}

const getAllNewsHome = async (req, res) => {
  try {
    const news = await newsModel.findAll({
      raw: true,
      attributes: {
        include: [
          [sequelize.fn('DATE_FORMAT', sequelize.col('news.createdAt'), '%d-%m-%Y'), 'dayCreated'],
        ]
      },
      include: [
        {
          model: typeNewsModel,
          as: 'type_news',
          attributes: []
        }
      ],
      order: [['id', 'desc']],
      limit: 6,
      offset: 0,
    });
      res.json(news);
  } catch (error) {
      res.status(500).json({ message: 'Có lỗi xảy ra.' });
  }
}

const getNews = async (req, res) => {
  try {
      const id = req.params.id;
      const updateViewNews = await newsModel.update(
        { view: sequelize.literal('view + 1') },
        { where: { id } }
      )
      if(!updateViewNews){
        res.status(400).json({ message: 'Có lỗi xảy ra.' });
      }
      const news = await newsModel.findOne({
        attributes: {
          include: [
            [sequelize.fn('DATE_FORMAT', sequelize.col('createdAt'), '%d-%m-%Y'), 'dayCreated'],
          ]
        },
        where: {
          id
        }
      });   
      res.json(news);
  } catch (error) {
      res.status(400).json({ message: 'Có lỗi xảy ra.' });
  }
}


export default { getAllNews, getNews, getAllNewsHome };