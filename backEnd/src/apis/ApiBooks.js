import express from "express";
import bookModel from "../models/BookModels.js";
import userModel from "../models/UserModels.js";
import borrowModel from "../models/BorrowModels.js";
import { categoryModel } from '../models/index.js'
import { Op } from "sequelize";

const getNewBooks = async (req, res) => {
  const days = 30;
  const dateThreshold = new Date();
  dateThreshold.setDate(dateThreshold.getDate() - days);

  try {
    const newBooks = await bookModel.findAll({
      where: {
        createdAt: {
          [Op.gte]: dateThreshold,
        },
      },
      order: [["createdAt", "DESC"]],
    });
    res.json(newBooks);
  } catch (error) {
    res.status(500).json({ error: "Có lỗi xảy ra khi lấy sách mới." });
  }
};

const getAllBooks = async (req, res) => {
  try {
    const books = await bookModel.findAll({
      include: [
        {
          model: categoryModel,
          as: "category",
          attributes: ["name"],
        },
      ],
    });
    res.json(books);
  } catch (error) {
    res.status(500).json({ error: "Có lỗi xảy ra." });
  }
};

const getBookById = async (req, res) => {
  const { id } = req.params; // Lấy ID từ tham số URL

  try {
    const book = await bookModel.findByPk(id);

    if (!book) {
      return res.status(404).json({ error: "Sách không tìm thấy." });
    }
    res.json(book);
  } catch (error) {
    res.status(500).json({ error: "Có lỗi xảy ra." });
  }
};

const getBooksByCategory = async (req, res) => {
  try {
    const books = await bookModel.findAll({
      where: { categoryId: req.params.id },
    });
    if (books.length > 0) {
      res.json(books);
    } else {
      res.status(404).json({ error: "No books found for this category" });
    }
  } catch (error) {
    res.status(500).json({ error: "Database query error" });
  }
};

const requestBook = async (req, res) => {
  try {
    const { user, book } = req.body;
    const today = new Date();
    today.setDate(today.getDate() + 7);
    const dueDate = today.toISOString().split("T")[0];

    const checkUser = await userModel.findByPk(user);
    if (!checkUser) {
      req.flash("error", "Người dùng không tồn tại!");
      return res.status(400).redirect(`/chi-tiet-sach/${book}`);
    }

    const checkBook = await bookModel.findByPk(book);
    if (!checkBook) {
      req.flash("error", "Sách không tồn tại!");
      return res.status(400).redirect(`/chi-tiet-sach/${book}`);
    }

    if (checkBook.count > 0) {
      checkBook.count -= 1;
      await checkBook.save();
    } else {
      req.flash("error", "Số lượng sách không đủ để thêm phiếu mượn!");
      return res.status(400).redirect(`/chi-tiet-sach/${book}`);
    }

    const createBorrow = await borrowModel.create({
      dueDate,
      status: 1,
      bookId: book,
      userId: user,
    });
    req.flash("success", "Gửi yêu cầu mượn thành công");
    return res.status(201).redirect(`/chi-tiet-sach/${book}`);
  } catch (error) {
    console.error("Error in requestBook:", error);
    res.status(500).json({ error: "Có lỗi xảy ra." });
  }
};

export default {
  getAllBooks,
  getBookById,
  getBooksByCategory,
  requestBook,
  getNewBooks,
};
