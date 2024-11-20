const checkNotLoggedIn = (req, res, next) => {
  if (req.session.admin) {
    return res.redirect('/the-loai')
  }
  next()
}

export default checkNotLoggedIn
