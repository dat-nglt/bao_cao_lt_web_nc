import { sequelize, borrowModel, userModel, bookModel } from '../models/index.js';
import { Op } from "sequelize";

const getBorrowPage = async (req, res) => {
  const limit = 10;
  const search = req.query.search ? req.query.search : "";
  const sort = req.query.sort ? req.query.sort : "desc";
  const currentPage = req.query.page ? req.query.page : 1;
  const status = req.query.status ? req.query.status : '0';
  const whereConditions = {
      [Op.or]: [
          {
              '$user.studentCode$': {
                  [Op.like]: `%${search}%`,
              }
          },
          {
              '$book.name$': {
                  [Op.like]: `%${search}%`,
              }
          }
      ]
  };
  if (status !== '0') {
      whereConditions.status = status;
  }
  const today = new Date();
  const currentDate = today.toISOString().split('T')[0]; 
  const updateOverDue = await borrowModel.update(
    { status: 4 },
    {
        where: {
            dueDate: {
                [Op.lt]: currentDate
            }
        }
    }
  );
  const totalBorrow = await borrowModel.findAll({
      raw: true,
      where: whereConditions,
      include: [
          {
              model: userModel,
              as: 'user',
              attributes: ['id', 'fullName', 'studentCode']
          },
          {
              model: bookModel,
              as: 'book',
              attributes: ['id', 'name']
          }
      ],
      order: [["id", sort]],
  });
  const totalPage = Math.ceil(totalBorrow.length / limit);
  const start = (currentPage - 1) * limit;
  const listBorrow = await borrowModel.findAll({
    raw: true,
    attributes: {
      include: [
          [sequelize.fn('DATE_FORMAT', sequelize.col('borrow.createdAt'), '%d-%m-%Y'), 'dayCreated'],
          [sequelize.fn('DATE_FORMAT', sequelize.col('borrow.dayReturn'), '%d-%m-%Y'), 'dayReturn'],
          [sequelize.fn('DATE_FORMAT', sequelize.col('borrow.dueDate'), '%d-%m-%Y'), 'dueDate'],
          [sequelize.fn('DATEDIFF', sequelize.fn('CURDATE'), sequelize.col('borrow.dayReturn')), 'overdue']
      ]
    },
    where: whereConditions,
    include: [
      {
          model: userModel,
          as: 'user',
          attributes: ['id', 'fullName', 'studentCode']
      },
      {
          model: bookModel,
          as: 'book',
          attributes: ['id', 'name']
      }
    ],
    order: [["id", sort]],
    limit: limit,
    offset: start,
  });
  const listUser = await userModel.findAll({raw: true, attributes: ["id", "fullName", "studentCode"]});
  const listBook = await bookModel.findAll({raw: true, attributes: ['id', 'name', 'count']});
  return res.render("layout", {
    data: {
      title: "Mượn trả sách",
      messageError: req.flash("error"),
      messageSuccess: req.flash("success"),
      page: "borrow",
      row: listBorrow,
      listUser,
      listBook,
      currentPage: parseInt(currentPage),
      totalPage: parseInt(totalPage),
      status,
      sort,
      search,
      limit,
    },
  });
};

const createBorrow = async (req, res) =>{
  const { user, book } = req.body;
  const today = new Date();
  today.setDate(today.getDate() + 7);
  const dueDate = today.toISOString().split('T')[0]; 
  const checkUser = await userModel.findByPk(user);
  if(!checkUser){
    req.flash("error", "Người dùng không tồn tại!");
    res.status(400).redirect("/muon-tra");
    return;
  }
  const checkBook = await bookModel.findByPk(book);
  if (checkBook) {
    if (checkBook.count > 0) {
        checkBook.count -= 1;
        await checkBook.save();
    } else {
      req.flash("error", "Số lượng sách không đủ để thêm phiếu mượn!");
      res.status(400).redirect("/muon-tra");
      return;
    }
  } else {
    req.flash("error", "Sách không tồn tại!");
    res.status(400).redirect("/muon-tra");
    return;
  }
  const createBorrow = await borrowModel.create({ dueDate, status: 2, bookId: book, userId: user });
  if (createBorrow) {
    req.flash("success", "Thêm phiếu mượn thành công");
    res.status(201).redirect("/muon-tra");
    return;
  } else {
    req.flash("error", "Thêm phiếu mượn thất bại!");
    res.status(400).redirect("/muon-tra");
    return;
  }
}

const updateBorrow = async (req, res) =>{
  const id = req.params.id;
  const checkBorrow = await borrowModel.findByPk(id);
  if(!checkBorrow){
    req.flash("error", "Thông tin phiếu mượn không hợp lệ!");
    res.status(400).redirect("/muon-tra");
    return
  }
  if(checkBorrow.status === '1'){
    const checkBook = await bookModel.findByPk(checkBorrow.bookId);
    if (checkBook) {
      if (checkBook.count > 0) {
          checkBook.count -= 1;
          await checkBook.save();
      } else {
        req.flash("error", "Số lượng sách không đủ để duyệt phiếu mượn!");
        res.status(400).redirect("/muon-tra");
        return;
      }
    } else {
      req.flash("error", "Sách không tồn tại!");
      res.status(400).redirect("/muon-tra");
      return;
    }
    const updateBorrow = await borrowModel.update(
      { status: 2 },
      { where: { id } }
    );
    if(updateBorrow){
      req.flash("success", "Duyệt yêu cần mượn thành công");
      res.status(200).redirect("/muon-tra");
      return
    }else{
      req.flash("error", "Duyệt yêu cần mượn thất bại!");
      res.status(200).redirect("/muon-tra");
      return
    }
  }else if(checkBorrow.status === '2'){
    const checkBook = await bookModel.findByPk(checkBorrow.bookId);
    if (checkBook) {
      checkBook.count += 1;
      const updateCountBook = await checkBook.save();
      if (!updateCountBook) {
        req.flash("error", "Cập nhật lại số lượng sách thất bại!");
        res.status(400).redirect("/muon-tra");
        return;
      }
    } else {
      req.flash("error", "Sách không tồn tại!");
      res.status(400).redirect("/muon-tra");
      return;
    }
    const updateBorrow = await borrowModel.update(
      { status: 3 },
      { where: { id } }
    );
    if(updateBorrow){
      req.flash("success", "Cập nhật trả sách thành công");
      res.status(200).redirect("/muon-tra");
      return
    }else{
      req.flash("error", "Cập nhật trả sách thất bại!");
      res.status(200).redirect("/muon-tra");
      return
    }
  }else{
    req.flash("error", "Yêu cầu không hợp lệ!");
    res.status(200).redirect("/muon-tra");
    return
  }
}

const cancelBorrow = async (req, res) =>{
  const id = req.params.id;
  const checkBorrow = await borrowModel.findByPk(id);
  if(!checkBorrow){
    req.flash("error", "Thông tin phiếu mượn không hợp lệ!");
    res.status(400).redirect("/muon-tra");
    return
  }
  if(checkBorrow.status != 1){
    req.flash("error", "Thông tin phiếu mượn không hợp lệ!");
    res.status(400).redirect("/muon-tra");
    return
  }
  const updateBorrow = await borrowModel.update(
    { status: 5 },
    { where: { id } }
  );
  if(updateBorrow){
    req.flash("success", "Từ chối yêu cần mượn thành công");
    res.status(200).redirect("/muon-tra");
    return
  }else{
    req.flash("error", "Từ chối yêu cần mượn thất bại!");
    res.status(200).redirect("/muon-tra");
    return
  }
}

export default { getBorrowPage, createBorrow, updateBorrow, cancelBorrow };
