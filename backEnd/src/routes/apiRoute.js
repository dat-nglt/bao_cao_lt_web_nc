import express from "express";
import categoryController from "../controllers/CategoryControllers.js";
import apiNews from "../apis/ApiNews.js";
import apiBooks from "../apis/ApiBooks.js";
import apiCategory from "../apis/ApiCategory.js";
import apiTypeNews from "../apis/ApiTypeNews.js";

const router = express.Router();
const initApiRoute = (app) => {


  // Trang danh mục sách
    router.get('/danh-muc/xem-tat-ca', apiBooks.getAllBooks);
    router.get('/danh-muc/:id', apiBooks.getBooksByCategory);
    router.get('/chi-tiet-sach/:id', apiBooks.getBookById);
    router.get('/danh-muc', apiCategory.getAllCategory);


    // router.post('/the-loai', categoryController.addCategory);
    // router.post('/the-loai/:id', categoryController.updateCategory);
    // router.delete('/the-loai/:id', categoryController.deleteCategory);
    // Trang sách
    // router.get('/sach', apiBooks.getBookPage);
    // router.post('/sach', ApibookController.addBook);
    // router.post('/sach/:id', ApibookController.updateBook);
    // router.delete('/sach/:id', ApibookController.deleteBook);

    //loại tin tức
    router.get('/loai-tin-tuc', apiTypeNews.getAllTypeNews);
    
    // Tin tức
    router.get('/tin-tuc', apiNews.getAllNews);
    

    return app.use('/api/v1/', router);
}

export default initApiRoute


