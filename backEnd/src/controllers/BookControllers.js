import express from "express";
import { bookModel, sequelize } from "../models";
import cloudinary from "../utils/cloudinary.js";
import { IncomingForm } from "formidable";
import fs from "fs";
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

  const totalBook = totalBookResult[0].total;
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

const addBook = async (req, res) => {
  const addBookForm = new IncomingForm();

  addBookForm.parse(req, async (err, fields, files) => {
    if (err) {
      req.flash("error", "Đã có lỗi xảy ra!");
      res.status(400).redirect("/quan-li-sach");
    }

    try {
      const imageFile = files.image;

      if (!imageFile) {
        throw new Error("Không tìn thấy hình ảnh");
      }

      const name = files.name[0]
      const author = files.author[0]
      const publisherBook = files.publisher[0]
      const 
    } catch (error) {
      console.error("Error adding category:", error.message);
      req.flash("error", error.message || "Lỗi hệ thống!");
      return res.status(400).redirect("/the-loai");
    }
  });
};

const updateBook = async (req, res) => {};

const deleteBook = async (req, res) => {
  try {
    const bookId = req.params.id;

    if (!bookId) {
      throw new Error("ID sách không hợp lệ hoặc không được cung cấp");
    }

    const deleteRows = await bookModel.destroy({
      where: { id: bookId },
    });

    if (deleteRows === 0) {
      throw new Error("Không tìm thấy sách với ID được cung cấp");
    }

    req.flash("success", "Xóa sách thành công");
    return res.status(200).json({ message: "Xóa sách thành công" });
  } catch (error) {
    // Xử lý lỗi
    req.flash("error", error.message || "Có lỗi xảy ra khi xóa sách");
    return res
      .status(400)
      .json({ message: error.message || "Có lỗi xảy ra khi xóa sách" });
  }
};

export default { getBookPage, deleteBook, addBook, updateBook };
