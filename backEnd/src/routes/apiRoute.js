import express from "express";
import categoryController from "../controllers/CategoryControllers.js";
import bookController from "../controllers/BookControllers.js";
const router = express.Router();
const initApiRoute = (app) => {
  // Trang danh mục sách
    router.get('/danh-muc/xem-tat-ca', bookController.getAllBooks);
    // router.post('/the-loai', categoryController.addCategory);
    // router.post('/the-loai/:id', categoryController.updateCategory);
    // router.delete('/the-loai/:id', categoryController.deleteCategory);
    // Trang sách
    router.get('/sach', bookController.getBookPage);
    // router.post('/sach', bookController.addBook);
    // router.post('/sach/:id', bookController.updateBook);
    // router.delete('/sach/:id', bookController.deleteBook);
    return app.use('/api/v1/', router);
}

export default initApiRoute


