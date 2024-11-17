import { log } from 'console';
import { typeNewsModel, newsModel, sequelize } from '../models/index.js';
import cloudinary from "../utils/cloudinary.js";
import { IncomingForm } from "formidable";
import fs from "fs";
import { Op } from "sequelize";
import { type } from 'os';

const getNewsPage = async (req, res) => {
  const limit = 5;
  const search = req.query.search ? req.query.search : "";
  const sort = req.query.sort ? req.query.sort : "desc";
  const currentPage = req.query.page ? req.query.page : 1;
  const type = req.query.type ? req.query.type : '0';
  const whereConditions = {
    title: {
        [Op.like]: `%${search}%`,
    }
  };
  if (type !== '0') {
    whereConditions.typeId = type;
  }
  const totalNews = await newsModel.findAll({
    raw: true, 
    where: whereConditions
  });
  const totalPage = Math.ceil(totalNews.length / limit);
  const start = (currentPage - 1) * limit;
  const listNews = await newsModel.findAll({
    raw: true,
    where: whereConditions,
    order: [["id", sort]],
    limit: limit,
    offset: start,
    include: [{
      model: typeNewsModel,
      as: 'type_news',
      attributes: ['id', 'name']
  }],
  });
  const listTypeNews = await typeNewsModel.findAll({
    raw: true,
    attributes: ['id', 'name']
  });
  return res.render("layout", {
    data: {
      title: "Tin tức",
      messageError: req.flash("error"),
      messageSuccess: req.flash("success"),
      page: "news",
      row: listNews,
      listTypeNews,
      currentPage: parseInt(currentPage),
      totalPage: parseInt(totalPage),
      sort,
      search,
      type: parseInt(type),
      limit,
    },
  });
};

const createNews = async (req, res) => {
  const form = new IncomingForm();
  form.parse(req, async (err, fields, files) => {
    if (err) {
      req.flash("error", "Ảnh bìa không hợp lệ!");
      res.status(400).redirect("/tin-tuc");
      return;
    }
    const file = files.image;
    if (!file) {
      req.flash("error", "Ảnh bìa không hợp lệ!");
      res.status(400).redirect("/tin-tuc");
      return;
    }
    const title = fields.title[0];
    const news = await newsModel.findOne({
      where: {
        title: title
      },
    });
    if(news){
      req.flash("error", "Tiêu đề tin tức đã tồn tại!");
      res.status(400).redirect("/tin-tuc");
      return;
    }
    const type = fields.type[0];
    const typeNews = await typeNewsModel.findOne({
      where: {
        id: type
      },
    });
    if(!typeNews){
      req.flash("error", "Loại tin tức không hợp lệ!");
      res.status(400).redirect("/tin-tuc");
      return;
    }
    cloudinary.uploader.upload(file[0].filepath, async (err, result) => {
      fs.unlink(file[0].filepath, (unlinkErr) => {
        if (unlinkErr) {
          req.flash("error", "Không tìm thấy hình ảnh!");
          res.status(400).redirect("/tin-tuc");
          return;
        }
      });
      if (err) {
        req.flash("error", "Tải ảnh bìa thất bại!");
        res.status(400).redirect("/tin-tuc");
        return;
      }
      const content = fields.content[0];
      const image = result.secure_url;
     
      const createdNews = await newsModel.create({ title, image, content, typeId: type });
      if (createdNews) {
        req.flash("success", "Thêm tin tức thành công");
        res.status(201).redirect("/tin-tuc");
        return;
      } else {
        req.flash("error", "Thêm tin tức thất bại!");
        res.status(400).redirect("/tin-tuc");
        return;
      }
    });
  });
};

const updateNews = async (req, res) => {
    const form = new IncomingForm();
    form.parse(req, async (err, fields, files) => {
      if (err) {      
        req.flash("error", "Ảnh bìa không hợp lệ!");
        res.status(400).redirect("/tin-tuc");
        return;
      }
      const file = files.image;
      const title = fields.title[0];
      const content = fields.content[0];
      const type = fields.type[0];
      if(file[0].originalFilename){ 
        const news = await newsModel.findOne({
          where: {
            id: req.params.id
          },
        });
        if(news.title !== title){
          const otherNews = await newsModel.findOne({
            where: {
              title: title
            },
          });
          if(otherNews && otherNews.title === title){
            req.flash("error", "Tiêu đề tin tức đã tồn tại!");
            res.status(400).redirect("/tin-tuc");
            return;
          }
        }
        const typeNews = await typeNewsModel.findOne({
          where: {
            id: type
          },
        });
        if(!typeNews){
          req.flash("error", "Loại tin tức không hợp lệ!");
          res.status(400).redirect("/tin-tuc");
          return;
        }
        cloudinary.uploader.upload(file[0].filepath, async (err, result) => {
          fs.unlink(file[0].filepath, (unlinkErr) => {
            if (unlinkErr) {
              req.flash("error", "Không tìm thấy hình ảnh!");
              res.status(400).redirect("/tin-tuc");
              return;
            }
          });
          if (err) {
            req.flash("error", "Tải ảnh bìa thất bại!");
            res.status(400).redirect("/tin-tuc");
            return;
          }
          const newImage = result.secure_url;
          const updateNews = await newsModel.update(
            { title, content, image: newImage, typeId: type },
            { where: { id: req.params.id } }
          );
          if (updateNews) {
            req.flash("success", "Cập nhật tin tức thành công");
            res.status(200).redirect("/tin-tuc");
            return;
          } else {
            req.flash("error", "Cập nhật tin tức thất bại!");
            res.status(400).redirect("/tin-tuc");
            return;
          }
        });
      }else{
        const news = await newsModel.findOne({
          where: {
            id: req.params.id
          },
        });
        if(news.title !== title){
          const otherNews = await newsModel.findOne({
            where: {
              title: title
            },
          });
          if(otherNews && otherNews.title === title){
            req.flash("error", "Tiêu đề tin tức đã tồn tại!");
            res.status(400).redirect("/tin-tuc");
            return;
          }
        }
        const typeNews = await typeNewsModel.findOne({
          where: {
            id: type
          },
        });
        if(!typeNews){
          req.flash("error", "Loại tin tức không hợp lệ!");
          res.status(400).redirect("/tin-tuc");
          return;
        }
        const updateNews = await newsModel.update(
          { title, content, typeId: type },
          { where: { id: req.params.id } }
        );
        if (updateNews) {
          req.flash("success", "Cập nhật tin tức thành công");
          res.status(200).redirect("/tin-tuc");
          return;
        } else {
          req.flash("error", "Cập nhật tin tức thất bại!");
          res.status(400).redirect("/tin-tuc");
          return;
        }
      }  
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

export default { getNewsPage, createNews, updateNews, deleteNews };
