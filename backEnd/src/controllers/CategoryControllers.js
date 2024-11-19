import { bookModel, categoryModel, sequelize } from '../models'
import { Op } from 'sequelize'
import { IncomingForm } from 'formidable'

const getCategoryPage = async (req, res) => {
  const limit = 5
  const search = req.query.search ? req.query.search : ''
  const sort = req.query.sort ? req.query.sort : 'desc'
  const currentPage = req.query.page ? req.query.page : 1
  const type = req.query.type ? req.query.type : '0'

  const whereConditions = {
    name: {
      [Op.like]: `%${search}%`
    }
  }

  // Lấy tổng số danh mục thoả mãn điều kiện tìm kiếm
  const totalCategoryQuery = `
    SELECT COUNT(*) AS total
    FROM categories AS category
    WHERE category.name LIKE :search
  `
  const totalCategoryResult = await sequelize.query(totalCategoryQuery, {
    replacements: { search: `%${search}%` },
    type: sequelize.QueryTypes.SELECT
  })
  const totalCategory = totalCategoryResult[0].total
  const totalPage = Math.ceil(totalCategory / limit)
  const start = (currentPage - 1) * limit

  // Truy vấn danh mục với số lượng sách, phân trang, tìm kiếm và sắp xếp
  const listCategoryQuery = `
    SELECT 
      category.id, 
      category.name, 
      category.description, 
      category.createdAt, 
      category.updatedAt, 
      SUM(book.count) AS bookCount
    FROM 
      categories AS category
    LEFT JOIN 
      books AS book ON category.id = book.categoryId
    WHERE 
      category.name LIKE :search
    GROUP BY 
      category.id
    ORDER BY 
      category.id ${sort}
    LIMIT :limit OFFSET :start
  `
  const listCategoryResult = await sequelize.query(listCategoryQuery, {
    replacements: {
      search: `%${search}%`,
      limit: limit,
      start: start
    },
    type: sequelize.QueryTypes.SELECT
  })

  return res.render('layout', {
    data: {
      title: 'Thể loại',
      messageError: req.flash('error'),
      messageSuccess: req.flash('success'),
      page: 'category',
      row: listCategoryResult,
      currentPage: parseInt(currentPage),
      totalPage: parseInt(totalPage),
      sort,
      search,
      type: parseInt(type),
      limit
    }
  })
}

const addCategory = async (req, res) => {
  const form = new IncomingForm()
  form.parse(req, async (err, fields, files) => {
    if (err) {
      console.error('Error parsing form:', err)
      req.flash('error', 'Có lỗi xảy ra khi xử lý form!')
      res.status(400).redirect('/categories')
      return
    }

    try {
      const nameCategory = fields.nameCategory[0]
      const descriptionCategory = fields.descriptionCategory[0]

      if (!nameCategory || !descriptionCategory) {
        req.flash('error', 'Tên thể loại và mô tả không được để trống')
        return res.status(400).redirect('/the-loai')
      }

      const categoryExits = await categoryModel.findOne({
        where: { name: nameCategory }
      })

      if (categoryExits) {
        req.flash('error', 'Thể loại đã tồn tại trong hệ thống')
        return res.status(400).redirect('/the-loai')
      }

      const newCategory = await categoryModel.create({
        name: nameCategory,
        description: descriptionCategory
      })

      if (!newCategory) {
        req.flash('error', 'Thêm thể loại thất bại')
        return res.status(400).redirect('/the-loai')
      }

      req.flash('success', 'Thêm thể loại thành công')
      return res.status(201).redirect('/the-loai')
    } catch (error) {
      console.error('Error creating category:', error)
      req.flash('error', 'Lỗi hệ thống!')
      return res.status(500).redirect('/the-loai')
    }
  })
}

const deleteCategory = async (req, res) => {
  try {
    const categoryId = req.params.id
    console.log(1)

    const deletedRows = await categoryModel.destroy({
      where: { id: categoryId }
    })

    if (deletedRows === 0) {
      // Kiểm tra xem có thể loại nào được xóa không
      req.flash('error', 'Xóa thể loại thất bại!')
      return res.status(400).json({ message: 'Xóa thể loại thất bại' })
    }

    req.flash('success', 'Xóa thể loại thành công!')
    return res.status(200).json({ message: 'Xóa thể loại thành công' })
  } catch (error) {
    req.flash('error', 'Có lỗi xảy ra khi xóa thể loại!')
    return res.status(400).json({ message: 'Xóa thể loại thất bại' })
  }
}

const updateCategory = async (req, res) => {
  try {
    const categoryId = req.params.id
    const { nameCategory, descriptionCategory } = req.body

    if (!nameCategory || !descriptionCategory) {
      req.flash('error', 'Tên và mô tả thể loại không được để trống!')
      return res
        .status(400)
        .json({ message: 'Tên và mô tả thể loại không được để trống!' })
    }

    const category = await categoryModel.findOne({
      where: { id: categoryId }
    })

    if (!category) {
      req.flash('error', 'Thể loại không tồn tại!')
      return res.status(404).json({ message: 'Thể loại không tồn tại!' })
    }

    // Cập nhật thông tin thể loại
    const updatedCategory = await categoryModel.update(
      {
        name: nameCategory,
        description: descriptionCategory
      },
      {
        where: { id: categoryId }
      }
    )

    if (updatedCategory[0] === 0) {
      req.flash('error', 'Cập nhật thể loại thất bại!')
      return res.status(400).json({ message: 'Cập nhật thể loại thất bại!' })
    }

    req.flash('success', 'Cập nhật thể loại thành công!')
    return res.status(200).json({ message: 'Cập nhật thể loại thành công!' })
  } catch (error) {
    req.flash('error', 'Có lỗi xảy ra khi cập nhật thể loại!')
    return res
      .status(500)
      .json({ message: 'Có lỗi xảy ra khi cập nhật thể loại!' })
  }
}

export default { getCategoryPage, addCategory, deleteCategory, updateCategory }
