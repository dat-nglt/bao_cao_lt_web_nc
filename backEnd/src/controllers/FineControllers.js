import { fineModel } from '../models/index.js';
import { Op } from 'sequelize';

////api
const getAllFines = async (req, res) => {
  try {
    const fines = await fineModel.findAll({
      raw: true,
    });

    return res.status(200).json({
      success: true,
      data: fines,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      message: 'Đã xảy ra lỗi khi lấy danh sách liên hệ',
    });
  }
};
const getFineById = async (req, res) => {
  try {
    const fineId = req.params.id;
    const fine = await fineModel.findByPk(fineId);

    if (!fine) {
      return res.status(404).json({
        success: false,
        message: 'Liên hệ không tồn tại',
      });
    }

    return res.status(200).json({
      success: true,
      data: fine,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      message: 'Đã xảy ra lỗi khi lấy thông tin liên hệ',
    });
  }
};


/// controller
const getFinePage = async (req, res) => {
  
  return res.render("layout", {
    data: {
      title: "Phí Phạt",
      page: "fine",
     
    },
  });
};
const deleteFine = async (req, res) => {
  try {
    const fineId = req.params.id;

    const fine = await fineModel.findByPk(fineId);
    if (!fine) {
      req.flash('error', 'Liên hệ không tồn tại');
      return res.redirect('/phan-hoi');
    }

    await fineModel.destroy({ where: { id: fineId } });

    req.flash('success', 'Xóa liên hệ thành công');
    return res.redirect('/phan-hoi');
    } catch (error) {
      console.error(error);
      req.flash('error', 'Đã xảy ra lỗi khi xóa liên hệ');
      return res.redirect('/phan-hoi');
  };
}
export default { getFinePage, deleteFine, getAllFines, getFineById };
