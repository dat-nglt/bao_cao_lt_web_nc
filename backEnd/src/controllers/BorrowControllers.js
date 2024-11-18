import { typeNewsModel, newsModel, sequelize, borrowModel, userModel, bookModel } from '../models/index.js';
import { Op } from "sequelize";

const getBorrowPage = async (req, res) => {
  const limit = 5;
  const search = req.query.search ? req.query.search : "";
  const sort = req.query.sort ? req.query.sort : "desc";
  const currentPage = req.query.page ? req.query.page : 1;
  const status = req.query.status ? req.query.status : 'all';
  // const whereConditions = {
  //   title: {
  //       [Op.like]: `%${search}%`,
  //   }
  // };
  // if (status !== 'all') {
  //   whereConditions.status = status;
  // }
  const totalBorrow = await borrowModel.findAll({
    raw: true, 
    // where: whereConditions
  });
  const totalPage = Math.ceil(totalBorrow.length / limit);
  const start = (currentPage - 1) * limit;
  const listBorrow = await borrowModel.findAll({
    raw: true,
    // where: whereConditions,
    order: [["id", sort]],
    limit: limit,
    offset: start,
    include: [{
      model: userModel,
      as: 'user',
      attributes: ['id', 'fullName']
  }],
  include: [{
    model: bookModel,
    as: 'book',
    attributes: ['id', 'name']
}],
  });
  console.log(listBorrow);
  
  return res.render("layout", {
    data: {
      title: "Mượn trả sách",
      messageError: req.flash("error"),
      messageSuccess: req.flash("success"),
      page: "borrow",
      row: listBorrow,
      currentPage: parseInt(currentPage),
      totalPage: parseInt(totalPage),
      sort,
      search,
      limit,
    },
  });
};

const createBorrow = () =>{

}

const updateBorrow = () =>{
  
}

const deleteBorrow = () =>{
  
}

export default { getBorrowPage, createBorrow, updateBorrow, deleteBorrow };
