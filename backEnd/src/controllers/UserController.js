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

const getUserPage = async (req, res) => {
  return res.render('user', {
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

  if (existUser.dataValues.passWord !== adminPassword) {
    req.flash('error', 'Mật khẩu không chính xác, vui lòng kiểm tra lại')
    return res.status(400).redirect('/dang-nhap')
  }

  if (existUser.dataValues.roleAccess !== 2) {
    req.flash('error', 'Vui lòng sử dụng tài khoản quản trị viên để truy cập hệ thống!')
    return res.status(200).redirect('/dang-nhap')
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



const addUser = async (req, res) => {
  try {
    const { studentCode, passWord, fullName, dateOfBirth, addressUser, phoneNumber, email, identificationNumber } = req.body;
    if (!studentCode || !passWord || !fullName) {
      req.flash('error', 'Vui lòng nhập đầy đủ mã sinh viên, mật khẩu và họ tên.');
      return res.status(400).redirect('/them-nguoi-dung');
    }
    const existingUser = await userModel.findOne({ where: { studentCode } });
    if (existingUser) {
      req.flash('error', 'Mã sinh viên đã tồn tại. Vui lòng kiểm tra lại.');
      return res.status(400).redirect('/them-nguoi-dung');
    }
    const hashedPassword = await bcrypt.hash(passWord, 10);
    await userModel.create({
      studentCode,
      passWord: hashedPassword,
      fullName,
      dateOfBirth,
      addressUser,
      phoneNumber,
      email,
      identificationNumber,
      roleAccess: 1, 
    });

    req.flash('success', 'Thêm người dùng quản trị thành công!');
    return res.status(200).redirect('/');
  } catch (error) {
    console.error('Lỗi khi thêm người dùng quản trị:', error);
    req.flash('error', 'Có lỗi xảy ra. Vui lòng thử lại.');
    return res.status(500).redirect('/them-nguoi-dung');
  }
};















export default { getLoginPage, handleLogin, handleLogout, getUserPage }
