const checkLoggedIn = (req, res, next) => {
  if (!req.session.admin) {
    req.flash('error', 'Bạn cần đăng nhập để truy cập chức năng này')
    return res.redirect('/dang-nhap')
  }
  next()
}

export default checkLoggedIn
