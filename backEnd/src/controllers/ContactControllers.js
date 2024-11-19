import { contactModel } from '../models/index.js';
import { Op } from 'sequelize';

////api
const getAllContacts = async (req, res) => {
  try {
    const contacts = await contactModel.findAll({
      raw: true,
    });

    return res.status(200).json({
      success: true,
      data: contacts,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      message: 'Đã xảy ra lỗi khi lấy danh sách liên hệ',
    });
  }
};
const getContactById = async (req, res) => {
  try {
    const contactId = req.params.id;
    const contact = await contactModel.findByPk(contactId);

    if (!contact) {
      return res.status(404).json({
        success: false,
        message: 'Liên hệ không tồn tại',
      });
    }

    return res.status(200).json({
      success: true,
      data: contact,
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
const getContactPage = async (req, res) => {
  const limit = 5;
  const search = req.query.search ? req.query.search : "";
  const sort = req.query.sort ? req.query.sort : "desc";
  const currentPage = req.query.page ? req.query.page : 1;
  const whereConditions = {
    [Op.or]: [
      { name: { [Op.like]: `%${search}%` } },
      { email: { [Op.like]: `%${search}%` } },
      { tel: { [Op.like]: `%${search}%` } },
      { description: { [Op.like]: `%${search}%` } },
    ],
  };
  const totalContact = await contactModel.findAll({
    raw: true, 
    where: whereConditions
  });
  const totalPage = Math.ceil(totalContact.length / limit);
  const start = (currentPage - 1) * limit;
  const listContact = await contactModel.findAll({
    raw: true,
    where: whereConditions,
    order: [["id", sort]],
    limit: limit,
    offset: start,
  });
  return res.render("layout", {
    data: {
      title: "Phản hồi",
      messageError: req.flash("error"),
      messageSuccess: req.flash("success"),
      page: "contact",
      row: listContact,
      currentPage: parseInt(currentPage),
      totalPage: parseInt(totalPage),
      sort,
      search,
      limit,
    },
  });
};
const deleteContact = async (req, res) => {
  try {
    const contactId = req.params.id;

    const contact = await contactModel.findByPk(contactId);
    if (!contact) {
      req.flash('error', 'Liên hệ không tồn tại');
      return res.redirect('/phan-hoi');
    }

    await contactModel.destroy({ where: { id: contactId } });

    req.flash('success', 'Xóa liên hệ thành công');
    return res.redirect('/phan-hoi');
    } catch (error) {
      console.error(error);
      req.flash('error', 'Đã xảy ra lỗi khi xóa liên hệ');
      return res.redirect('/phan-hoi');
  };
}
export default { getContactPage, deleteContact, getAllContacts, getContactById };
