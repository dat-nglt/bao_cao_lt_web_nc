import express from "express";
import typeNewsControllers from "../controllers/TypeNewsControllers.js";
import newsControllers from "../controllers/NewsControllers.js";
import borrowControllers from "../controllers/BorrowControllers.js";
import contactControllers from "../controllers/ContactControllers.js";
import UserController from "../controllers/UserController.js";
import CategoryControllers from "../controllers/CategoryControllers.js";
import FineControllers from "../controllers/FineControllers.js";
import checkLoggedIn from "../middlewares/checkLoggedIn.js";
import checkNotLoggedIn from "../middlewares/checkNotLoggedIn.js";
import BookControllers from "../controllers/BookControllers.js";
//middlewere

import AutoGenerateFineMiddleware from "../middlewares/AutoGenerateFineMiddleware.js";

const router = express.Router();
const initWebRoute = (app) => {
  //tài khoản
  router.get("/dang-nhap", checkNotLoggedIn, UserController.getLoginPage);
  router.post("/dang-nhap", UserController.handleLogin);
  router.get("/dang-xuat", UserController.handleLogout);
  //Độc giả
  router.get("/doc-gia",checkNotLoggedIn, UserController.getUserPage);
  router.get("/doc-gia/:id",checkNotLoggedIn, UserController.getUserById);
  router.post("/sua-doc-gia/:id",checkNotLoggedIn, UserController.updateUser);
  router.post("/them-doc-gia",checkNotLoggedIn, UserController.addUser);
  router.post("/khoa-doc-gia/:id",checkNotLoggedIn, UserController.lockEndUnLockUser);
  router.post("/mo-khoa-doc-gia/:id",checkNotLoggedIn, UserController.lockEndUnLockUser);
  //thể loại
  router.get("/the-loai", checkLoggedIn, CategoryControllers.getCategoryPage);
  router.post("/the-loai", checkLoggedIn, CategoryControllers.addCategory);
  router.delete(
    "/the-loai/:id",
    checkLoggedIn,
    CategoryControllers.deleteCategory
  );
  router.put(
    "/the-loai/:id",
    checkLoggedIn,
    CategoryControllers.updateCategory
  );

  //sách
  router.get("/quan-li-sach",checkLoggedIn, BookControllers.getBookPage);
  router.post("/quan-li-sach",checkLoggedIn, BookControllers.addBook);
  router.post("/quan-li-sach/cap-nhap/:id",checkLoggedIn, BookControllers.updateBook);
  router.delete("/quan-li-sach/:id",checkLoggedIn, BookControllers.deleteBook);

  //mượn trả
  router.get("/muon-tra", checkLoggedIn, borrowControllers.getBorrowPage);
  router.post("/muon-tra", checkLoggedIn, borrowControllers.createBorrow);
  router.post(
    "/muon-tra/update/:id",
    checkLoggedIn,
    borrowControllers.updateBorrow
  );
  router.post(
    "/muon-tra/cancel/:id",
    checkLoggedIn,
    borrowControllers.cancelBorrow
  );
  router.get(
    "/phi-phat",
    checkLoggedIn,
    AutoGenerateFineMiddleware,
    FineControllers.getFinePage
  );
  router.put(
    "/tra-tien-phat/:borrowId",
    checkLoggedIn,
    FineControllers.paidFine
  );
  //phản hồi
  router.get(
    "/api/get-all-contact",
    checkLoggedIn,
    contactControllers.getAllContacts
  );
  router.get(
    "/api/get-contact/:id",
    checkLoggedIn,
    contactControllers.getContactById
  );
  router.get("/phan-hoi", checkLoggedIn, contactControllers.getContactPage);
  router.delete(
    "/phan-hoi/:id/delete",
    checkLoggedIn,
    contactControllers.deleteContact
  );
  //loại tin tức
  router.get(
    "/the-loai-tin-tuc",
    checkLoggedIn,
    typeNewsControllers.getTypeNewsPage
  );
  router.post(
    "/the-loai-tin-tuc",
    checkLoggedIn,
    typeNewsControllers.createTypeNews
  );
  router.post(
    "/the-loai-tin-tuc/update/:id",
    checkLoggedIn,
    typeNewsControllers.updateTypeNews
  );
  router.post(
    "/the-loai-tin-tuc/delete/:id",
    checkLoggedIn,
    typeNewsControllers.deleteTypeNews
  );

  //tin tức
  router.get("/tin-tuc", checkLoggedIn, newsControllers.getNewsPage);
  router.post("/tin-tuc", checkLoggedIn, newsControllers.createNews);
  router.post("/tin-tuc/update/:id", checkLoggedIn, newsControllers.updateNews);
  router.post("/tin-tuc/delete/:id", checkLoggedIn, newsControllers.deleteNews);

  // router.get("*", (req, res) => res.send("Không có trang này")); 
  return app.use("/", router);
};

export default initWebRoute;
