import express from "express";
import { bookModel, sequelize } from "../models";

import { Op } from "sequelize";

const getBookPage = async (req, res) => {
  const limit = 5;
  const search = req.query.search ? req.query.search : "";
  const sort = req.query.sort ? req.query.sort : "desc";
  const currentPage = req.query.page ? req.query.page : 1;

  const whereConditions = {
    name: {
      [Op.like]: `%${search}%`,
    },
  };

  const totalBookQuery = `
    SELECT COUNT(*) AS total
    FROM books
    WHERE books.name LIKE :search
  `;

  const totalBookResult = await sequelize.query(totalBookQuery, {
    replacements: { search: `%${search}` },
    type: sequelize.QueryTypes.SELECT,
  });

  const totalBook = totalBookResult[0].totalBook;
  const totalPage = Math.ceil(totalBook / limit);
  const start = (currentPage - 1) * limit;

  const listBookQuery = `
    SELECT
        books.id,
        books.name,
        books.count,
        books.categoryId,
        books.imgBook,
        books.creatorBook,
        books.publisherBook,
        books.dateBook,
        books.desBook
    FROM
        books
    WHERE
        books.name LIKE :search
    ORDER BY 
        books.id ${sort}
    LIMIT :limit OFFSET :start
  `;

  const listBookResult = await sequelize.query(listBookQuery, {
    replacements: {
      search: `%${search}%`,
      limit: limit,
      start: start,
    },
    type: sequelize.QueryTypes.SELECT,
  });

  if (listBookResult) {
    console.log(listBookResult);
  }

  return res.render("layout", {
    data: {
      title: "Quản lý sách",
      messageError: req.flash("error"),
      messageSuccess: req.flash("success"),
      page: "book",
      row: listBookResult,
      currentPage: parseInt(currentPage),
      totalPage: parseInt(totalPage),
      sort,
      search,
      limit,
    },
  });
};

const getAllBooks = async (req, res) => {
  try {
    const books = await bookModel.findAll();
    res.json(books);
  } catch (error) {
    res.status(500).json({ error: "Có lỗi xảy ra." });
  }
};

export default { getBookPage, getAllBooks };
