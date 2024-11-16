import { typeNewsModel, newsModel, sequelize } from '../models/index.js';
import { Op } from 'sequelize';

const getTypeNewsPage = async (req, res) => {
    const limit = 5;
    const search = req.query.search ? req.query.search : "";
    const sort = req.query.sort ? req.query.sort : "desc";
    const currentPage = req.query.page ? parseInt(req.query.page) : 1;
    const totalTypeNews = await typeNewsModel.findAll({
      raw: true, 
        where: {
            name: {
                [Op.like]: `%${search}%`,
            },
        },
    });
    const totalPage = Math.ceil(totalTypeNews.length / limit);
    const start = (currentPage - 1) * limit;
    const listTypeNews = await typeNewsModel.findAll({
      raw: true, 
      where: {
        name: {
          [Op.like]: `%${search}%`,
        },
      },
      order: [["id", sort]],
      limit: limit,
      offset: start,
    });
    const listNews = await newsModel.findAll({
      raw: true,
      attributes: [
        'typeId',
        [sequelize.fn('COUNT', sequelize.col('id')), 'count']
    ],
    group: ['typeId']
  });
  const countNews = listNews.reduce((acc, item) => {
      acc[item.typeId] = item.count;
      return acc;
  }, {});
    return res.render("layout", {
        data: {
            title: "Thể loại tin tức",
            messageError: req.flash("error"),
            messageSuccess: req.flash("success"),
            page: "type_news",
            row: listTypeNews,
            countNews,
            currentPage,
            totalPage,
            sort,
            search,
            limit,
        },
    });
};

const deleteNews = async (req, res) => {
  const id = req.params.id
  const deleteNews = await newsModel.destroy({ where : { id } });
  if (deleteNews) {
    req.flash("success", "Xóa tin tức thành công");
    res.status(200).redirect("/tin-tuc");
    return;
  } else {
    req.flash("error", "Xóa tin tức thất bại!");
    res.status(400).redirect("/tin-tuc");
    return;
  }
};

export default { getTypeNewsPage, deleteNews };
