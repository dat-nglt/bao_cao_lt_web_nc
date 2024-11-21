import borrowModel from '../models/BorrowModels.js'
import fineModel from '../models/FineModels.js'

const AutoGenerateFineMiddleware = async (req, res, next) => {
  try {
    const borrows = await borrowModel.findAll({
      //Lấy tất cả phiếu mượn
      where: {
        dayReturn: null
      }
    })
    const currentDate = new Date()

    for (const borrow of borrows) {
      if (borrow.status === 3) {
        continue
      }

      const dueDate = new Date(borrow.dueDate) //Ngày trả dự kiến của phiếu mượn
      const daysLate = Math.floor(
        // Số ngày trễ hạn so với thực tế
        (currentDate - dueDate) / (1000 * 60 * 60 * 24)
      )

      if (daysLate <= 0) {
        // Nếu không trễ hạn thì xét tiếp tục
        continue
      }

      const existingFine = await fineModel.findOne({
        // Tìm bản ghi phí phạt dựa theo id mượn
        where: { id_borrow: borrow.id }
      })
      if (existingFine) {
        // Nếu bản ghi tồn thì cập nhật lại số tiền phạt
        if (borrow.status !== 3) {
          await fineModel.update(
            {
              amount: daysLate * 2000,
              fineDate: new Date() // Ngày cập nhật phiếu
            },
            {
              where: { id: existingFine.id }
            }
          )
        }
      } else {
        await fineModel.create({
          // Nếu không tồn tại phiếu thì tạo phiếu
          id_borrow: borrow.id,
          amount: daysLate * 2000
        })
      }
    }

    next()
  } catch (error) {
    console.error('Tạo phí phạt phí không thành công:', error)
    res.status(500).json({ message: 'Tạo phí phạt không thành công!' })
  }
}

export default AutoGenerateFineMiddleware
