import express from "express";
import categoryController from "../controllers/CategoryControllers.js";
import bookController from "../controllers/BookControllers.js";
import typeNewsControllers from "../controllers/TypeNewsControllers.js";
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

  //t
  router.get("/the-loai-tin-tuc", typeNewsControllers.getTypeNewsPage);
  // router.post("/the-loai-tin-tuc", newsControllers.createNews);
  // router.post("/the-loai-tin-tuc/update/:id", newsControllers.updateNews);
  // router.post("/the-loai-tin-tuc/delete/:id", newsControllers.deleteNews);

  //tin tức
  router.get("/tin-tuc", newsControllers.getNewsPage);
  router.post("/tin-tuc", newsControllers.createNews);
  router.post("/tin-tuc/update/:id", newsControllers.updateNews);
  router.post("/tin-tuc/delete/:id", newsControllers.deleteNews);


  router.post("*", (req, res) => res.redirect("/not-found"));
  return app.use("/", router);
};

export default initWebRoute;
