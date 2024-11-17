import { typeNewsModel, newsModel, sequelize } from '../models/index.js';
import { Op } from 'sequelize';

const getTypeNewsPage = async (req, res) => {
    const limit = 10;
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
    let sortCondition;
    if (sort === 'desc' || sort === 'asc') {
        sortCondition = `type_news.id ${sort}`;
    } else if (sort === 'count_news_asc') {
        sortCondition = `count ASC`;
    } else {
        sortCondition = `count DESC`;
    }
    const listTypeNews = await sequelize.query(`
      SELECT type_news.*, DATE_FORMAT(type_news.createdAt, '%d/%m/%Y') AS dayCreated, COUNT(news.typeId) AS count
      FROM type_news LEFT JOIN news ON type_news.id = news.typeId
      WHERE type_news.name LIKE '%${search}%' GROUP BY type_news.id
      ORDER BY ${sortCondition} LIMIT ${start}, ${limit};`
      , {
        type: sequelize.QueryTypes.SELECT,
        raw: true
      }
    );
    return res.render("layout", {
        data: {
            title: "Loại tin tức",
            messageError: req.flash("error"),
            messageSuccess: req.flash("success"),
            page: "type_news",
            row: listTypeNews,
            currentPage: parseInt(currentPage),
            totalPage: parseInt(totalPage),
            sort,
            search,
            limit,
        },
    });
};

const createTypeNews = async (req, res) => {
    const { name } = req.body;
    const typeNews = await typeNewsModel.findOne({
      where: {
        name
      },
    });
    if(typeNews){
      req.flash("error", "Tên loại tin tức đã tồn tại!");
      res.status(400).redirect("/the-loai-tin-tuc");
      return;
    }
    const createTypeNews = await typeNewsModel.create({ name });
    if (createTypeNews) {
      req.flash("success", "Thêm loại tin tức thành công");
      res.status(201).redirect("/the-loai-tin-tuc");
      return;
    } else {
      req.flash("error", "Thêm loại tin tức thất bại!");
      res.status(400).redirect("/the-loai-tin-tuc");
      return;
    }
};

const updateTypeNews = async (req, res) => {
  const { name } = req.body;
  const typeNews = await typeNewsModel.findOne({
    where: {
      id: req.params.id
    },
  });
  if(typeNews.name !== name){
    const otherTypeNews = await typeNewsModel.findOne({
      where: {
        name
      },
    });
    if(otherTypeNews && otherTypeNews.name === name){
      req.flash("error", "Tên loại tin tức đã tồn tại!");
      res.status(400).redirect("/the-loai-tin-tuc");
      return;
    }
  }
  const updateTypeNews = await typeNewsModel.update(
    { name },
    { where: { id: req.params.id } }
  );
  if (updateTypeNews) {
    req.flash("success", "Cập nhật loại tin tức thành công");
    res.status(200).redirect("/the-loai-tin-tuc");
    return;
  } else {
    req.flash("error", "Cập nhật loại tin tức thất bại!");
    res.status(400).redirect("/the-loai-tin-tuc");
    return;
  }
};

const deleteTypeNews = async (req, res) => {
  const id = req.params.id
  const findTypeNews = await newsModel.findOne({ where : { typeId: id } });
  if (findTypeNews) {
    req.flash("error", "Vui lòng xóa các tin tức thuộc loại tin tức và thử lại");
    res.status(200).redirect("/the-loai-tin-tuc");
    return;
  }
  const deleteTypeNews = await typeNewsModel.destroy({ where : { id } });
  if (deleteTypeNews) {
    req.flash("success", "Xóa loại tin tức thành công");
    res.status(200).redirect("/the-loai-tin-tuc");
    return;
  } else {
    req.flash("error", "Xóa loại tin tức thất bại!");
    res.status(400).redirect("/the-loai-tin-tuc");
    return;
  }
};

export default { getTypeNewsPage, createTypeNews, updateTypeNews, deleteTypeNews };
