import { typeNewsModel, newsModel, sequelize } from '../models/index.js'
import cloudinary from '../utils/cloudinary.js'
import { IncomingForm } from 'formidable'
import fs from 'fs'
import { Op } from 'sequelize'

const getNewsPage = async (req, res) => {
  const limit = 10
  const search = req.query.search ? req.query.search : ''
  const sort = req.query.sort ? req.query.sort : 'desc'
  const currentPage = req.query.page ? req.query.page : 1
  const type = req.query.type ? req.query.type : '0'
  const whereConditions = {
    title: {
      [Op.like]: `%${search}%`
    }
  }
  if (type !== '0') {
    whereConditions.typeId = type
  }
  const totalNews = await newsModel.findAll({
    raw: true,
    where: whereConditions
  })
  const totalPage = Math.ceil(totalNews.length / limit)
  const start = (currentPage - 1) * limit
  const listNews = await newsModel.findAll({
    raw: true,
    attributes: {
      include: [
        [
          sequelize.fn(
            'DATE_FORMAT',
            sequelize.col('news.createdAt'),
            '%d-%m-%Y'
          ),
          'dayCreated'
        ]
      ]
    },
    where: whereConditions,
    order: [['id', sort]],
    limit: limit,
    offset: start,
    include: [
      {
        model: typeNewsModel,
        as: 'type_news',
        attributes: ['id', 'name']
      }
    ]
  })
  const listTypeNews = await typeNewsModel.findAll({
    raw: true,
    attributes: ['id', 'name'],
    order: [['name', 'asc']],
  })
  return res.render('layout', {
    data: {
      title: 'Tin tức',
      messageError: req.flash('error'),
      messageSuccess: req.flash('success'),
      page: 'news',
      row: listNews,
      listTypeNews,
      currentPage: parseInt(currentPage),
      totalPage: parseInt(totalPage),
      sort,
      search,
      type: parseInt(type),
      limit
    }
  })
}

const createNews = async (req, res) => {
  const form = new IncomingForm()
  form.parse(req, async (err, fields, files) => {
    if (err) {
      req.flash('error', 'Ảnh bìa không hợp lệ!')
      res.status(400).redirect('/tin-tuc')
      return
    }
    const file = files.image
    if (!file) {
      req.flash('error', 'Ảnh bìa không hợp lệ!')
      res.status(400).redirect('/tin-tuc')
      return
    }
    const title = fields.title[0].trim()
    if (title.length > 255) {
      req.flash('error', 'Tiêu đề tin tức không vượt quá 255 kí tự!')
      res.status(400).redirect('/tin-tuc')
      return
    }else if(title.length === 0){
      req.flash('error', 'Tiêu đề tin tức không được bỏ trống!')
      res.status(400).redirect('/tin-tuc')
      return
    }
    const news = await newsModel.findOne({
      where: {
        title: title
      }
    })
    if (news) {
      req.flash('error', 'Tiêu đề tin tức đã tồn tại!')
      res.status(400).redirect('/tin-tuc')
      return
    }
    const type = fields.type[0]
    const typeNews = await typeNewsModel.findOne({
      where: {
        id: type
      }
    })
    if (!typeNews) {
      req.flash('error', 'Loại tin tức không hợp lệ!')
      res.status(400).redirect('/tin-tuc')
      return
    }
    cloudinary.uploader.upload(file[0].filepath, async (err, result) => {
      fs.unlink(file[0].filepath, (unlinkErr) => {
        if (unlinkErr) {
          req.flash('error', 'Không tìm thấy hình ảnh!')
          res.status(400).redirect('/tin-tuc')
          return
        }
      })
      if (err) {
        req.flash('error', 'Tải ảnh bìa thất bại!')
        res.status(400).redirect('/tin-tuc')
        return
      }
      const content = fields.content[0]
      const image = result.secure_url
      const createdNews = await newsModel.create({
        title,
        image,
        content,
        typeId: type
      })
      if (createdNews) {
        req.flash('success', 'Thêm tin tức thành công')
        res.status(201).redirect('/tin-tuc')
        return
      } else {
        req.flash('error', 'Thêm tin tức thất bại!')
        res.status(400).redirect('/tin-tuc')
        return
      }
    })
  })
}

const updateNews = async (req, res) => {
  const id = req.params.id
  
  if (!id) {
    req.flash('error', 'Tin tức không tồn tại!')
    res.status(400).redirect('/tin-tuc')
    return
  }
  const updateNewsForm = new IncomingForm()
  updateNewsForm.parse(req, async (err, fields, files) => {
    try {
      const title = fields.title[0].trim()
      if (title.length > 255) {
        req.flash('error', 'Tiêu đề tin tức không vượt quá 255 kí tự!')
        res.status(400).redirect('/tin-tuc')
        return
      }else if(title.length === 0){
        req.flash('error', 'Tiêu đề tin tức không được bỏ trống!')
        res.status(400).redirect('/tin-tuc')
        return
      }
      const existNews = await newsModel.findOne({
        where: {
          id
        }
      })
      if (existNews.title !== title) {
        const otherNews = await newsModel.findOne({
          where: {
            title
          }
        })
        if (otherNews && otherNews.title === title) {
          req.flash('error', 'Tiêu đề tin tức đã tồn tại!')
          res.status(400).redirect('/tin-tuc')
          return
        }
      }

      const type = fields.type[0]
      const existTypeNews = await typeNewsModel.findOne({
        where: {
          id: type
        }
      })

      if (!existTypeNews) {
        req.flash('error', 'Loại tin tức không tồn tại!')
        res.status(400).redirect('/tin-tuc')
        return
      }

      const imageFile = files.image

      if (imageFile) {
        cloudinary.uploader.upload(
          imageFile[0].filepath,
          async (err, result) => {
            if (err) {
              req.flash('error', 'Ảnh bìa không hợp lệ!')
              res.status(400).redirect('/tin-tuc')
              return
            }

            fs.unlink(imageFile[0].filepath, (unlinkErr) => {
              if (unlinkErr) {
                console.error('Không thể xóa file tạm:', unlinkErr)
              }
            })

            const image = result.secure_url

            const updateNews = await newsModel.update(
              {
                title,
                image,
                content: fields.content[0],
                typeId : type
              },
              {
                where: { id }
              }
            )

            if (updateNews) {
              req.flash('success', 'Cập nhật tin tức thành công')
              res.status(400).redirect('/tin-tuc')
              return
            }else{
              req.flash('error', 'Cập nhật tin tức thất bại!')
              res.status(400).redirect('/tin-tuc')
              return
            }
          }
        )
      } else {
        const updateNews = await newsModel.update(
          {
            title,
            content: fields.content[0],
            typeId : type
          },
          {
            where: { id }
          }
        )

        if (updateNews) {
          req.flash('success', 'Cập nhật tin tức thành công')
          res.status(400).redirect('/tin-tuc')
          return
        }else{
          req.flash('error', 'Cập nhật tin tức thất bại!')
          res.status(400).redirect('/tin-tuc')
          return
        }
      }
    } catch (error) {
      req.flash('error', 'Có lỗi xảy ra!')
      return res.status(400).redirect('/tin-tuc')
    }
  })
}

const deleteNews = async (req, res) => {
  const id = req.params.id
  const deleteNews = await newsModel.destroy({ where: { id } })
  if (deleteNews) {
    req.flash('success', 'Xóa tin tức thành công')
    res.status(200).redirect('/tin-tuc')
    return
  } else {
    req.flash('error', 'Xóa tin tức thất bại!')
    res.status(400).redirect('/tin-tuc')
    return
  }
}

export default { getNewsPage, createNews, updateNews, deleteNews }
