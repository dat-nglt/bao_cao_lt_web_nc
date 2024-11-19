import express from "express";
import typeNewsControllers from "../controllers/TypeNewsControllers.js";
import newsControllers from "../controllers/NewsControllers.js";
import borrowControllers from "../controllers/BorrowControllers.js";
import contactControllers from "../controllers/ContactControllers.js";
import UserController from "../controllers/UserController.js";
import CategoryControllers from "../controllers/CategoryControllers.js";
import FineControllers from "../controllers/FineControllers.js"
//middlewere

import AutoGenerateFineMiddleware from "../middlewares/AutoGenerateFineMiddleware.js"


const router = express.Router();
const initWebRoute = (app) => {
  //tài khoản
  router.get("/dang-nhap", UserController.getLoginPage);

  //thể loại
  router.get("/the-loai", CategoryControllers.getCategoryPage);
  router.post("/the-loai", CategoryControllers.addCategory);
  router.delete("/the-loai/:id", CategoryControllers.deleteCategory);
  router.put("/the-loai/:id", CategoryControllers.updateCategory);

  //sách

  //mượn trả
  router.get("/muon-tra", borrowControllers.getBorrowPage);
  router.post("/muon-tra", borrowControllers.createBorrow);
  router.post("/muon-tra/update/:id", borrowControllers.updateBorrow);
  router.post("/muon-tra/cancel/:id", borrowControllers.cancelBorrow);

  //phí phạt
  router.get("/phi-phat",AutoGenerateFineMiddleware, FineControllers.getFinePage);
  router.delete("/phan-hoi/:id/delete", FineControllers.deleteFine);
  //phản hồi
  router.get("/api/get-all-contact", contactControllers.getAllContacts);
  router.get("/api/get-contact/:id", contactControllers.getContactById);
  router.get("/phan-hoi", contactControllers.getContactPage);
  router.delete("/phan-hoi/:id/delete", contactControllers.deleteContact);
  //loại tin tức
  router.get("/the-loai-tin-tuc", typeNewsControllers.getTypeNewsPage);
  router.post("/the-loai-tin-tuc", typeNewsControllers.createTypeNews);
  router.post(
    "/the-loai-tin-tuc/update/:id",
    typeNewsControllers.updateTypeNews
  );
  router.post(
    "/the-loai-tin-tuc/delete/:id",
    typeNewsControllers.deleteTypeNews
  );

  //tin tức
  router.get("/tin-tuc", newsControllers.getNewsPage);
  router.post("/tin-tuc", newsControllers.createNews);
  router.post("/tin-tuc/update/:id", newsControllers.updateNews);
  router.post("/tin-tuc/delete/:id", newsControllers.deleteNews);

  // router.get("*", (req, res) => res.send("Không có trang này"));
  return app.use("/", router);
};

export default initWebRoute;
