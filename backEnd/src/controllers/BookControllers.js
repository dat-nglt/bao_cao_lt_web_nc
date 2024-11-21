import express from "express";
import { bookModel, sequelize, categoryModel, borrowModel } from "../models";
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

  const listCategories = await categoryModel.findAll();

  if (!listCategories) {
    throw new Error("Tải dữ liệu thể loại không thành công");
  }

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

  if (!listBookResult) {
    throw new Error("Tải dữ liệu sách không thành công");
  }

  return res.render("layout", {
    data: {
      title: "Quản lý sách",
      messageError: req.flash("error"),
      messageSuccess: req.flash("success"),
      page: "book",
      row: listBookResult,
      listCategories,
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
      return res.status(400).redirect("/quan-li-sach");
    }
    try {
      const imageFile = files.image;
      if (!imageFile) { // Kiểm tra sự tồn tại của hình ảnh gửi lên
        throw new Error("Không tìm thấy hình ảnh");
      }
      const name = fields.name[0];
      if (name.length > 255) { // Kiểm tra tính đúng đắng của dữ liệu tên sách
        throw new Error("Tên sách không được vượt quá 255 ký tự");
      }

      const existBook = await bookModel.findOne({// Kiểm tra sách có tồn tại trong hệ thống hay chưa
        where: {
          name: name,
        },
      });

      if (existBook) { 
        throw new Error("Sách đã tồn tại trong hệ thống");
      }

      const categoryId = fields.categoryId[0]; // Kiểm tra tính đúng đắn của thể loại sách
      const existCategory = await categoryModel.findOne({
        where: {
          id: categoryId,
        },
      });

      if (!existCategory) {
        throw new Error("Thể loại sách không tồn tại trong hệ thống");
      }

      const count = fields.count[0]; // Kiểm tra tính đúng đắn của số lượng sách nhập kho
      if (parseInt(count) <= 0 || null) {
        throw new Error("Số lượng sách phải lớn hơn 0");
      }

      cloudinary.uploader.upload(imageFile[0].filepath, async (err, result) => {
        fs.unlink(imageFile[0].filepath, (unlinkErr) => {
          if (unlinkErr) {
            throw new Error("Không tìn thấy hình ảnh");
          }
        });

        if (err) {
          throw new Error("Tải lên thông tin sách thất bại");
        }

        const imageURL = result.secure_url;
        const newBook = await bookModel.create({
          name: name,
          count: count,
          imgBook: imageURL,
          creatorBook: fields.author[0],
          publisherBook: fields.publisherBook[0],
          dateBook: fields.dateBook[0],
          desBook: fields.desBook[0],
          categoryId: fields.categoryId[0],
        });

        if (!newBook) {
          throw new Error("Thêm sách thất bại");
        }

        req.flash("success", "Thêm sách thành công");
        return res.status(200).redirect("/quan-li-sach");
      });
    } catch (error) {
      console.error("Error adding category:", error.message);
      req.flash("error", error.message || "Lỗi hệ thống!");
      return res.status(400).redirect("/quan-li-sach");
    }
  });
};

const updateBook = async (req, res) => {
  const updateId = req.params.id;

  if (!updateId) {
    // Kiểm tra tính đúng đắn của dữ liệu ID
    throw new Error("Không xác định được sách cần cập nhật");
  }

  const updateBookForm = new IncomingForm();
  updateBookForm.parse(req, async (err, fields, files) => {
    try {
      const name = fields.name[0]; // Kiểm tra tính hợp lệ của tên sách được cập nhật
      if (name.length > 255) {
        throw new Error("Tên sách không được vượt quá 255 ký tự");
      }

      const existBook = await bookModel.findOne({
        // Kiểm tra sự tồn tại của sách
        where: {
          id: updateId,
        },
      });

      if (existBook.name !== name) {
        // Nếu sách tồn tại và tên sách khác với tên nhập vào thì
        //Done
        const otherBook = await bookModel.findOne({
          // Tiếp tục kiểm tra xem có sách nào trùng tên không
          where: {
            name: name,
          },
        });

        if (otherBook && otherBook.name === name) {
          // Nếu đã trùng tên thì không cho cập nhập vào hệ thống
          throw new Error("Tên sách đã tồn tại trong hệ thống");
        }
      }

      const categoryId = fields.categoryId[0]; // Kiểm tra tính đúng đắng của thể loại
      const existCategory = await categoryModel.findOne({
        where: {
          id: categoryId,
        },
      });

      if (!existCategory) {
        throw new Error("Thể loại sách không tồn tại trong hệ thống");
      }

      const count = fields.count[0]; // Kiểm tra tính đúng đắng của số lượng sách được thêm vào
      if (parseInt(count) <= 0 || null) {
        throw new Error("Số lượng sách phải lớn hơn 0");
      }

      const imageFile = files.image; // Lấy ra hình ảnh từ dữ liệu gửi lên để cập nhật

      if (imageFile) {
        // Nếu có tồn tại ảnh mới cập nhật thì xử lý theo trường hợp cập nhật hình ảnh
        cloudinary.uploader.upload(
          imageFile[0].filepath,
          async (err, result) => {
            if (err) {
              throw new Error(err);
            }

            fs.unlink(imageFile[0].filepath, (unlinkErr) => {
              if (unlinkErr) {
                console.error("Không thể xóa file tạm:", unlinkErr);
              }
            });

            const imageURL = result.secure_url;

            const newBook = await bookModel.update(
              {
                name: name,
                count: count,
                imgBook: imageURL,
                creatorBook: fields.author[0],
                publisherBook: fields.publisherBook[0],
                dateBook: fields.dateBook[0],
                desBook: fields.desBook[0],
                categoryId: fields.categoryId[0],
              },
              {
                where: { id: updateId },
              }
            );

            if (!newBook) {
              throw new Error("Cập nhật sách thất bại");
            }

            req.flash("success", "Cập nhật sách thành công");
            return res.status(200).redirect("/quan-li-sach");
          }
        );
      } else {
        // Trường hợp không cập nhật lại hình ảnh của sách
        const newBook = await bookModel.update(
          {
            name: name,
            count: count,
            creatorBook: fields.author[0],
            publisherBook: fields.publisherBook[0],
            dateBook: fields.dateBook[0],
            desBook: fields.desBook[0],
            categoryId: fields.categoryId[0],
          },
          {
            where: { id: updateId },
          }
        );

        if (!newBook) {
          throw new Error("Cập nhật sách thất bại");
        }

        req.flash("success", "Cập nhật sách thành công");
        return res.status(200).redirect("/quan-li-sach");
      }
    } catch (error) {
      console.error("Error adding category:", error.message);
      req.flash("error", error.message || "Lỗi hệ thống!");
      return res.status(400).redirect("/quan-li-sach");
    }
  });
};

const deleteBook = async (req, res) => {
  try {
    const bookId = req.params.id;

    if (!bookId) {
      // Kiểm tra tính đúng dắn của dữ liệu ID
      throw new Error("ID sách không hợp lệ hoặc không được cung cấp");
    }

    const borrowedBook = await borrowModel.findOne({
      // Kiểm tra xem sách có đang mượn bởi độc giả không
      where: {
        bookId: bookId,
      },
    });

    if (borrowedBook) {
      // Nếu có được mượn thì không cho xóa
      throw new Error("Không thể xóa sách đang được mượn");
    }

    const deleteRows = await bookModel.destroy({
      // Thực hiện xóa
      where: { id: bookId },
    });

    if (deleteRows === 0) {
      // Trường hợp không trả về dữ liệu được xóa
      throw new Error("Xóa sách thất bại");
    }

    req.flash("success", "Xóa sách thành công"); // Trường hợp xóa thành công
    return res.status(200).json({ message: "Xóa sách thành công" });
  } catch (error) {
    // Nhận lỗi và xử lí
    req.flash("error", error.message || "Có lỗi xảy ra khi xóa sách");
    return res.status(400).redirect("/quan-li-sach");
  }
};

export default { getBookPage, deleteBook, addBook, updateBook };
