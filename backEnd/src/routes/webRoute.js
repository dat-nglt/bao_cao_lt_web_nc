import express from "express";
import categoryController from "../controllers/CategoryControllers.js";
import bookController from "../controllers/BookControllers.js";
const router = express.Router();
const initWebRoute = (app) => {
  // Trang danh mục sách
    router.get('/danh-muc', categoryController.getCategoryPage);
    router.post('/danh-muc', categoryController.addCategory);
    router.post('/danh-muc/:id', categoryController.updateCategory);
    router.delete('/danh-muc/:id', categoryController.deleteCategory);
    // Trang sách
    router.get('/sach', bookController.getBookPage);
    router.post('/sach', bookController.addBook);
    router.post('/sach/:id', bookController.updateBook);
    router.delete('/sach/:id', bookController.deleteBook);
    router.delete('/sach/:id', bookController.deleteBook);
    router.post('*', (req, res) => res.redirect('/not-found'));
    return app.use('/', router);
}

export default initWebRoute


