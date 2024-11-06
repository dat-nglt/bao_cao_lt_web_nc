import express from "express";
import categoryController from "../controllers/CategoryControllers.js";
import bookController from "../controllers/BookControllers.js";
import newsControllers from "../controllers/NewsControllers.js";
const router = express.Router();
const initWebRoute = (app) => {
  //tài khoản

  //thể loại
  router.get("/the-loai", categoryController.getCategoryPage);
  router.post("/the-loai", categoryController.addCategory);
  router.post("/the-loai/:id", categoryController.updateCategory);
  router.delete("/the-loai/:id", categoryController.deleteCategory);

  //sách
  router.get("/sach", bookController.getBookPage);
  router.post("/sach", bookController.addBook);
  router.post("/sach/:id", bookController.updateBook);
  router.delete("/sach/:id", bookController.deleteBook);

  //mượn trả

  //phí phạt

  //phản hồi

  //tin tức
  router.get("/tin-tuc", newsControllers.getNewsPage);
  router.post("/tin-tuc", bookController.addBook);
  router.post("/tin-tuc/:id", bookController.updateBook);
  router.delete("/tin-tuc/:id", bookController.deleteBook);


  router.post("*", (req, res) => res.redirect("/not-found"));
  return app.use("/", router);
};

export default initWebRoute;
