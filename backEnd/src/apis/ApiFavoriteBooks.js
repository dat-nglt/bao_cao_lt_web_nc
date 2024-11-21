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
  const { userId, bookId } = req.body

  try {
    if (!userId || !bookId) {
      return res.status(400).json({ message: 'userId và bookId là bắt buộc',data: { userId, bookId }})
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
  const { userId } = req.params;

  try {
    // Lấy tất cả các bookId yêu thích của người dùng
    const favoriteBooksId = await sequelize.query(
      `SELECT 
          bookId
       FROM favoritebooks
       WHERE userId = ${userId}`,
      {
        type: sequelize.QueryTypes.SELECT,
        raw: true
      }
    );

    // Kiểm tra nếu người dùng không có sách yêu thích
    if (favoriteBooksId.length === 0) {
      return res.status(200).json({
        message: 'Người dùng không có sách yêu thích nào',
        data: []
      });
    }

    // Lấy thông tin sách từ bảng books dựa trên các bookId
    const bookIds = favoriteBooksId.map(book => book.bookId);
    const favoriteBooks = await sequelize.query(
      `SELECT 
          *
       FROM books
       WHERE id IN (${bookIds.join(',')})
       ORDER BY name ASC`,
      {
        type: sequelize.QueryTypes.SELECT,
        raw: true
      }
    );

    res.status(200).json({
      message: 'Lấy danh sách sách yêu thích thành công',
      data: favoriteBooks
    });
  } catch (error) {
    res.status(500).json({
      message: 'Lỗi khi lấy danh sách sách yêu thích',
      error: error.message
    });
  }
};

const getIdFavoriteBooksByUserId = async (req, res) => {
  const { userId } = req.params

  try {
    const favoriteBooks = await sequelize.query(
      `
        SELECT 
            bookId
        FROM favoritebooks
        WHERE userId = ${userId}
      `,
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
      message: 'Lấy id sách yêu thích thành công',
      data: favoriteBooks
    })
  } catch (error) {
    res.status(500).json({
      message: 'Lỗi khi lấy id sách yêu thích',
      error: error.message
    })
  }
}

const getFavoriteBooks = async (req, res) => {
  try {
    const favoriteBooksId = await sequelize.query(
      `SELECT 
          bookId
       FROM favoritebooks
       GROUP BY bookId
       HAVING COUNT(userId) > 1`,
      {
        type: sequelize.QueryTypes.SELECT,
        raw: true
      }
    );
    if (favoriteBooksId.length === 0) {
      return res.status(200).json({
        message: 'Không có sách nào có hơn 1 người thích',
        data: []
      });
    }
    const bookIds = favoriteBooksId.map(book => book.bookId);

    const books = await sequelize.query(
      `SELECT 
          *
       FROM books
       WHERE id IN (${bookIds.join(',')})
       ORDER BY id ASC`,
      {
        type: sequelize.QueryTypes.SELECT,
        raw: true
      }
    );

    // Trả về danh sách sách
    res.status(200).json({
      message: 'Lấy danh sách sách yêu thích thành công',
      data: books
    });
  } catch (error) {
    res.status(500).json({
      message: 'Lỗi khi lấy danh sách sách yêu thích',
      error: error.message
    });
  }
};

export default { getFavoriteBooks, getFavoriteBooksByUserId, getIdFavoriteBooksByUserId, removeFavoriteBook, addFavoriteBook }
