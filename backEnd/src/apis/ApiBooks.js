import express from "express";
import bookModel from "../models/BookModels.js";
import userModel from "../models/UserModels.js";
import borrowModel from "../models/BorrowModels.js";
import { categoryModel } from "../models/index.js";
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

const getAllBooksBySearch = async (req, res) => {
  const { danhMuc, tuKhoa } = req.body;
  let danhmuc;
  switch (danhMuc) {
    case "sach":
      danhmuc = "name";
      break;
    case "tacgia":
      danhmuc = "creatorBook";
      break;
    case "theloai":
      danhmuc = "$category.name$";
      break;
    case "namxuatban":
      danhmuc = "dateBook";
      break;
    case "nhaxuatban":
      danhmuc = "publisherBook";
      break;
    default:
      danhmuc = "";
      break;
  }
  try {
    let whereConditions = {};
    if (!danhmuc && tuKhoa) {
      whereConditions = {
        [Op.or]: [
          { name: { [Op.like]: `%${tuKhoa}%` } },
          { creatorBook: { [Op.like]: `%${tuKhoa}%` } },
          { publisherBook: { [Op.like]: `%${tuKhoa}%` } },
          { dateBook: { [Op.like]: `%${tuKhoa}%` } },
          { "$category.name$": { [Op.like]: `%${tuKhoa}%` } },
        ],
      };
    }
    if (danhmuc && !tuKhoa) {
      whereConditions[danhmuc] = { [Op.ne]: null };
    }
    if (!danhmuc && !tuKhoa) {
      whereConditions = {};
    }
    if (danhmuc && tuKhoa) {
      whereConditions[danhmuc] = { [Op.like]: `%${tuKhoa}%` };
    }

    const books = await bookModel.findAll({
      where: whereConditions,
      include: [
        {
          model: categoryModel,
          as: "category",
          attributes: ["name"],
        },
      ],
    });
    res.json({ data: books, search: [danhmuc, tuKhoa] });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Có lỗi xảy ra." });
  }
};

const getBookById = async (req, res) => {
  const { id } = req.params; // Lấy ID từ tham số URL

  try {
    const book = await bookModel.findAll({
      where: { id },
      include: [
        {
          model: categoryModel,
          as: "category",
          attributes: ["name"],
        },
      ],
    });

    if (!book) {
      return res.status(404).json({ error: "Sách không tìm thấy." });
    }
    
    res.json(book[0]);
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

    // Check if the user exists
    const checkUser = await userModel.findByPk(user);
    
    if (!checkUser) {
      return res.status(200).json({ message: "Tài khoản không tồn tại" });
    }

    // Check if the book exists
    const checkBook = await bookModel.findByPk(book);
    
    if (!checkBook) {
      return res.status(200).json({ message: "Sách không tồn tại" });
    }

    // Check if the user has less than 5 borrowed books that are not returned
    const activeBorrows = await borrowModel.count({
      where: {
        userId: user,
        status: { [Op.ne]: 3 }, // Assuming status 2 means returned
      },
    });

    if (activeBorrows >= 5) {
      return res
        .status(200)
        .json({ message: "Bạn chỉ được mượn tối đa 5 sách chưa trả." });
    }

    const existingBorrow = await borrowModel.findOne({
      where: {
        userId: user,
        bookId: book,
        status: { [Op.ne]: 3 }, // Check for active borrow
      },
    });

    if (existingBorrow) {
      return res
        .status(200)
        .json({ message: "Bạn đã mượn sách này trước đó." });
    }

    // Check if there are available copies of the book
    if (checkBook.count > 0) {
      // Tạo một bản ghi mượn mới
      const createBorrow = await borrowModel.create({
        dueDate,
        status: 1, // Giả sử trạng thái 1 có nghĩa là đang mượn
        bookId: book,
        userId: user,
      });

      // Trừ số lượng sách trong bảng books
      checkBook.count -= 1;
      await checkBook.save();

      return res.status(201).json({ message: "Gửi yêu cầu mượn thành công" });
    } else {
      return res.status(200).json({ message: "Số lượng sách không đủ" });
    }
  } catch (error) {
    console.error("Error in requestBook:", error);
    return res
      .status(500)
      .json({ message: "Có lỗi xảy ra trong quá trình gửi yêu cầu." });
  }
};

export default {
  getAllBooks,
  getBookById,
  getBooksByCategory,
  getAllBooksBySearch,
  requestBook,
  getNewBooks,
};
