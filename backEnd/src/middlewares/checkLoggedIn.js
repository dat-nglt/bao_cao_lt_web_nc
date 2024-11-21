const checkLoggedIn = (req, res, next) => {
  if (!req.session.admin) {
    req.flash("error", "Vui lòng đăng nhập để truy cập hệ thống");
    return res.redirect("/dang-nhap");
  }
  next();
};

export default checkLoggedIn;
