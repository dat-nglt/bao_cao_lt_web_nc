import express from 'express'
import apiNews from '../apis/ApiNews.js'
import apiBooks from '../apis/ApiBooks.js'
import apiCategory from '../apis/ApiCategory.js'
import apiTypeNews from '../apis/ApiTypeNews.js'
import apiContact from '../apis/ApiContact.js'
import apiUser from '../apis/ApiUser.js'
import apiFine from '../apis/ApiFine.js'
import apiFavoriteBook from '../apis/ApiFavoriteBooks.js'
//middleware
import authenticateToken from '../middlewares/apiMiddleware.js'
import AutoGenerateFineMiddleware from '../middlewares/AutoGenerateFineMiddleware.js'




const router = express.Router()
const initApiRoute = (app) => {
  // Người dùng
  router.post('/dang-nhap', apiUser.handleLogin)
  router.get('/thong-tin-nguoi-dung', apiUser.getInfoUser)
  router.get('/dang-xuat-user', apiUser.handleLogoutUser)
  router.get(
    '/danh-sach-muon/:id',
    authenticateToken,
    apiUser.handleGetAllBorrow
  )
  router.put(
    '/cap-nhat-mat-khau',
    authenticateToken,
    apiUser.handleUpdatePassword
  )

  // Trang danh mục sách
  router.post('/tim-kiem-sach', apiBooks.getAllBooksBySearch)
  router.get('/danh-muc/xem-tat-ca', apiBooks.getAllBooks)
  router.get('/danh-muc/:id', apiBooks.getBooksByCategory)
  router.get('/chi-tiet-sach/:id', apiBooks.getBookById)
  router.get('/danh-muc', apiCategory.getAllCategory)
  router.get('/danh-muc', apiCategory.getAllCategory)
  router.post('/yeu-cau-muon', apiBooks.requestBook)
  router.get('/sach-moi', apiBooks.getNewBooks)

  // router.post('/the-loai', categoryController.addCategory);
  // router.post('/the-loai/:id', categoryController.updateCategory);
  // router.delete('/the-loai/:id', categoryController.deleteCategory);
  // Trang sách
  // router.get('/sach', apiBooks.getBookPage);
  // router.post('/sach', ApibookController.addBook);
  // router.post('/sach/:id', ApibookController.updateBook);
  // router.delete('/sach/:id', ApibookController.deleteBook);

  //loại tin tức
  router.get('/loai-tin-tuc', apiTypeNews.getAllTypeNews)

  // Tin tức
  router.get('/tin-tuc', apiNews.getAllNews)
  router.get('/chi-tiet-tin-tuc/:id', apiNews.getNews)
  router.get('/tin-tuc-home', apiNews.getAllNewsHome)

  // liên hệ
  router.get('/phan-hoi', apiContact.getAllContact)
  router.post('/them-phan-hoi', apiContact.createContact)

  //phi phat
  router.get(
    '/phi-phat/:userId',
    authenticateToken,
    AutoGenerateFineMiddleware,
    apiFine.getFineByUserId
  )


  //sách yêu thích
  
  router.post('/them-yeu-thich-sach', apiFavoriteBook.addFavoriteBook)
  router.post('/xoa-yeu-thich-sach', apiFavoriteBook.removeFavoriteBook)



  return app.use('/api/v1/', router)
}

export default initApiRoute
