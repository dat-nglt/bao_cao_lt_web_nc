import { favoriteBookModel, sequelize } from '../models/index.js'

const addFavoriteBook = async (req, res) => {
  const { userId, bookId } = req.body
  try {
    if (!userId || !bookId) {
      return res.status(400).json({ message: 'userId và bookId là bắt buộc' })
    }
    const existingFavorite = await favoriteBookModel.findOne({
      where: { userId, bookId }
    })

    if (existingFavorite) {
      return res.status(409).json({
        message: 'Sách đã có trong danh sách yêu thích'
      })
    }

    const favorite = await favoriteBookModel.create({ userId, bookId })

    return res.status(201).json({
      message: 'Đã thêm sách vào danh sách yêu thích thành công',
      data: favorite
    })
  } catch (error) {
    return res.status(500).json({
      message: 'Lỗi khi thêm sách yêu thích',
      error: error.message
    })
  }
}

const removeFavoriteBook = async (req, res) => {
  const { userId, bookId } = req.params

  try {
    if (!userId || !bookId) {
      return res.status(400).json({ message: 'userId và bookId là bắt buộc' })
    }
    const existingFavorite = await favoriteBookModel.findOne({
      where: { userId, bookId }
    })

    if (!existingFavorite) {
      return res.status(404).json({
        message: 'Không tìm thấy mục yêu thích để xóa'
      })
    }
    await favoriteBookModel.destroy({ where: { userId, bookId } })
    return res.status(200).json({
      message: 'Đã xóa sách khỏi danh sách yêu thích thành công'
    })
  } catch (error) {
    return res.status(500).json({
      message: 'Lỗi khi xóa sách yêu thích',
      error: error.message
    })
  }
}

const getFavoriteBooksByUserId = async (req, res) => {
  const { userId } = req.params

  try {
    const favoriteBooks = await sequelize.query(
      `SELECT 
          fb.bookId,
          bk.name AS book_name,
          bk.author,
          bk.imgBook,
          bk.description,
          ct.name AS category_name
       FROM favoriteBooks fb
       JOIN books bk ON fb.bookId = bk.id
       LEFT JOIN categories ct ON bk.categoryId = ct.id
       WHERE fb.userId = ${userId}
       ORDER BY bk.name ASC;`,
      {
        type: sequelize.QueryTypes.SELECT,
        raw: true
      }
    )
    if (favoriteBooks.length === 0) {
      return res.status(200).json({
        message: 'Người dùng không có sách yêu thích nào',
        data: []
      })
    }
    res.status(200).json({
      message: 'Lấy danh sách sách yêu thích thành công',
      data: favoriteBooks
    })
  } catch (error) {
    res.status(500).json({
      message: 'Lỗi khi lấy danh sách sách yêu thích',
      error: error.message
    })
  }
}

export default { getFavoriteBooksByUserId, removeFavoriteBook, addFavoriteBook }
