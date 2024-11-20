import express from "express";
import apiNews from "../apis/ApiNews.js";
import apiBooks from "../apis/ApiBooks.js";
import apiCategory from "../apis/ApiCategory.js";
import apiTypeNews from "../apis/ApiTypeNews.js";
import apiContact from "../apis/ApiContact.js";
import apiUser from "../apis/ApiUser.js";

const router = express.Router();
const initApiRoute = (app) => {
  // Người dùng
  router.post("/dang-nhap", apiUser.handleLogin);

  // Trang danh mục sách
  router.get("/danh-muc/xem-tat-ca", apiBooks.getAllBooks);
  router.get("/danh-muc/:id", apiBooks.getBooksByCategory);
  router.get("/chi-tiet-sach/:id", apiBooks.getBookById);
  router.get("/danh-muc", apiCategory.getAllCategory);
  router.get("/danh-muc", apiCategory.getAllCategory);
  router.post("/yeu-cau-muon", apiBooks.requestBook);
  router.get("/sach-moi", apiBooks.getNewBooks);

  // router.post('/the-loai', categoryController.addCategory);
  // router.post('/the-loai/:id', categoryController.updateCategory);
  // router.delete('/the-loai/:id', categoryController.deleteCategory);
  // Trang sách
  // router.get('/sach', apiBooks.getBookPage);
  // router.post('/sach', ApibookController.addBook);
  // router.post('/sach/:id', ApibookController.updateBook);
  // router.delete('/sach/:id', ApibookController.deleteBook);

  //loại tin tức
  router.get("/loai-tin-tuc", apiTypeNews.getAllTypeNews);

  // Tin tức
  router.get("/tin-tuc", apiNews.getAllNews);
  router.get("/chi-tiet-tin-tuc/:id", apiNews.getNews);
  router.get("/tin-tuc-home", apiNews.getAllNewsHome);

  // liên hệ
  router.get("/phan-hoi", apiContact.getAllContact);
  router.post("/them-phan-hoi", apiContact.createContact);

  return app.use("/api/v1/", router);
};

export default initApiRoute;
