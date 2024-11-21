import { sequelize } from '../models/index.js'

const getFineByUserId = async (req, res) => {
  const { userId } = req.params
  console.log(userId)

  try {
    const fines = await sequelize.query(
      `SELECT 
            f.id_borrow,
            f.amount,
            f.fineDate,
            b.status AS borrow_status,
            bk.name,
            bk.imgBook,
            b.dueDate
        FROM fines f
        JOIN borrows b ON f.id_borrow = b.id
        JOIN books bk ON b.bookId = bk.id
        WHERE b.userId = ${userId}
        AND b.status = 4
        ORDER BY f.id DESC;`,
      {
        type: sequelize.QueryTypes.SELECT,
        raw: true
      }
    )

    if (fines.length === 0) {
      return res.status(200).json({
        message: 'Không tìm thấy phiếu phạt cho người dùng này',
        data: []
      })
    }

    res.status(200).json({
      message: 'Lấy phiếu phạt thành công',
      data: fines
    })
  } catch (error) {
    res.status(500).json({
      message: 'Lỗi khi lấy phiếu phạt',
      error: error.message
    })
  }
}

export default { getFineByUserId }
