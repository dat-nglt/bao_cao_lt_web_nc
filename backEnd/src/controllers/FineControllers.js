import { fineModel, userModel, borrowModel, bookModel } from '../models/index.js';
import { Op } from 'sequelize';

/// controller
const getFinePage = async (req, res) => {
  const limit = 5;
  const search = req.query.search ? req.query.search : "";
  const status = req.query.status ? req.query.status : "";
  const sort = req.query.sort ? req.query.sort : "desc";
  const currentPage = req.query.page ? req.query.page : 1;

  const whereConditions = {
    [Op.or]: [
      { id_borrow: { [Op.like]: `%${search}%` } },
    ],
  };
  if (status) {
    whereConditions['$borrow.status$'] = status;
  }

  const totalFine = await fineModel.count({
    where: whereConditions,
    include: [
      {
        model: borrowModel,
        as: "borrow",
        attributes: [] 
      }
    ]
  });

  const totalPage = Math.ceil(totalFine / limit);
  const start = (currentPage - 1) * limit;
  
  const listFine = await fineModel.findAll({
    raw: true,
    where: whereConditions,
    include: [
      {
        model: borrowModel,
        as: "borrow",
        include: [
          {
            model: userModel,
            as: "user",
            attributes: ["fullName"],
          }
        ],
        attributes: ["status"],
      },
    ],
    attributes: ["id_borrow", "amount", "fineDate"],
    order: [["id", sort]],
    limit: limit,
    offset: start,
  });

  if (totalFine === 0) {
    return res.render("layout", {
      data: {
        title: "Phản hồi",
        messageError: req.flash("error"),
        messageSuccess: req.flash("success"),
        page: "fine",
        row: [],
        currentPage: parseInt(currentPage),
        totalPage: 0,
        sort,
        status,
        search,
        limit,
      },
    });
  }

  return res.render("layout", {
    data: {
      title: "Phản hồi",
      messageError: req.flash("error"),
      messageSuccess: req.flash("success"),
      page: "fine",
      row: listFine,
      currentPage: parseInt(currentPage),
      totalPage: parseInt(totalPage),
      sort,
      status,
      search,
      limit,
    },
  });
};

const paidFine = async (req, res) => {
  const { borrowId } = req.params;

  try {
    const checkBorrow = await borrowModel.findByPk(borrowId);
    if (!checkBorrow) {
      req.flash("error", "Phiếu mượn không tồn tại!");
      return res.status(400).redirect("/phi-phat");
    }
    const checkBook = await bookModel.findByPk(checkBorrow.bookId);
    if (!checkBook) {
      req.flash("error", "Sách không tồn tại!");
      return res.status(400).redirect("/phi-phat");
    }
    if (checkBook.count <= 0) {
      req.flash("error", "Số lượng sách không đủ để duyệt phiếu mượn!");
      return res.status(400).redirect("/phi-phat");
    }
    await checkBook.update({ count: checkBook.count - 1 });
    const result = await borrowModel.update(
      {
        status: 3,
        dayReturn: new Date(),
      },
      { where: { id: borrowId } }
    );

    if (result[0] === 0) {
      req.flash("error", "Không tìm thấy phiếu mượn hoặc phiếu mượn đã được cập nhật");
      return res.redirect("/phi-phat");
    }

    req.flash("success", "Cập nhật trạng thái thanh toán thành công!");
    return res.redirect("/phi-phat");
  } catch (error) {
    console.error("Error updating status:", error);
    req.flash("error", "Có lỗi xảy ra khi cập nhật trạng thái");
    return res.redirect("/phi-phat");
  }
};


export default { getFinePage, paidFine };
