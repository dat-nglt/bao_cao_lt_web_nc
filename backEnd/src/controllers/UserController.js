import { userModel } from '../models'
import bcrypt from 'bcrypt'

const getLoginPage = async (req, res) => {
    return res.render('login', {
    data: {
      messageError: req.flash('error'),
      messageSuccess: req.flash('success'),
    }
  })
}

const handleLogin = async (req, res) => {
  const { adminAccount, adminPassword } = req.body
  if (!adminAccount || !adminPassword) {
    req.flash('error', 'Tên tài khoản và mật khẩu không được để trống')
    return res.status(400).redirect('/dang-nhap')
  }

  const existUser = await userModel.findOne({
    where: { studentCode: adminAccount }
  })

  if (!existUser) {
    req.flash('error', 'Tên tài khoản không tồn tại, vui lòng kiểm tra lại')
    return res.status(400).redirect('/dang-nhap')
  }

  // const isPasswordValid = await bcrypt.compare(
  //   adminPassword,
  //   existUser.password
  // )

  if (existUser.dataValues.passWord !== adminPassword) {
    req.flash('error', 'Mật khẩu không chính xác, vui lòng kiểm tra lại')
    return res.status(400).redirect('/dang-nhap')
  }

  req.session.admin = existUser.dataValues
  req.flash('success', 'Đăng nhập thành công')
  return res.status(200).redirect('/the-loai')
}

const handleLogout = async (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      return res.status(500).redirect('/dang-nhap')
    }
    req.flash('success', 'Đăng xuất thành công')
    return res.status(200).redirect('/dang-nhap')
  })
}

export default { getLoginPage, handleLogin, handleLogout }
