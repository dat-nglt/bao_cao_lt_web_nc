import { fineModel, borrowModel, userModel,bookModel  } from '../models/index.js';
const { Op } = require('sequelize');

const getFineByUserId = async (req, res) => {
    const { userId } = req.params;
    console.log(userId);
    
    try {
        
          const fines = await sequelize.query(
           `SELECT fines.id_borrow, fines.amount, fines.fineDate, borrows.status AS borrow_status
            FROM fines, borrows
            WHERE fines.id_borrow = borrows.id
            AND borrows.userId = ${userId}
            AND borrows.status = 4
            ORDER BY fines.id DESC;`
            , {
              type: sequelize.QueryTypes.SELECT,
              raw: true
            }
          );
        if (fines.length === 0) {
            return res.status(404).json({
                message: 'Không tìm thấy phiếu phạt cho người dùng này',
                data: [],
            });
        }

        res.status(200).json({
            message: 'Lấy phiếu phạt thành công',
            data: fines,
        });
    } catch (error) {
        res.status(500).json({
            message: 'Lỗi khi lấy phiếu phạt',
            error: error.message,
        });
    }
};

export default { getFineByUserId };
