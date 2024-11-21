import { userModel, borrowModel, bookModel } from '../models'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'

const handleLogin = async (req, res) => {
  const SECRET_KEY = process.env.JWT_SECRET || 'defaultSecretKey'

  const { username, password } = req.body

  try {
    if (!username || !password) {
      // Kiểm tra tính đúng đắn của dữ liệu đăng nhập
      return res.status(200).json({
        message: 'Tài khoản và mật khẩu không được để trống!',
        logined: false
      })
    }

    const existUser = await userModel.findOne({
      // Kiểm tra người dùng có tồn tại trong hệ thống không
      where: { studentCode: username }
    })

    if (!existUser) {
      // Trường hợp tài khoản không tồn tại trong hệ thống
      return res
        .status(200)
        .json({ message: 'Tài khoản không tồn tại', logined: false })
    }

    const isPasswordValid = await bcrypt.compare(password, existUser.passWord)

    if (!isPasswordValid) {
      // Kiểm tra tính đúng đắn của mật khẩu
      return res.status(200).json({
        message: 'Mật khẩu không chính xác',
        logined: false
      })
    }

    existUser.passWord = undefined // loại bỏ trường mật khẩu trước khi tạo token

    const token = jwt.sign({ existUser }, SECRET_KEY, { expiresIn: '1h' })
    if (!token) {
      // Kiểm tran tính hợp lệ của token khi đăng nhập
      return res.status(200).json({
        message:
          'Có lỗi trong quá trình đăng nhập, vui lòng thử lại (tokenError)',
        logined: false
      })
    }

    res.cookie('token', token, {
      // Thiết lập cookie cho người dùng khi đăng nhập thành công
      httpOnly: true,
      path: '/',
      maxAge: 60 * 60 * 1000
    })

    return res.status(200).json({
      message: token,
      logined: true,
      user: token
    })
  } catch (error) {
    return res.status(200).json({
      message: error,
      logined: false
    })
  }
}

const getInfoUser = async (req, res) => {
  try {
    const token = req.cookies.token

    if (!token) {
      return res.status(200).json({
        err: 0,
        message: 'Không tồn tại giá trị xác thực'
      })
    }

    jwt.verify(token, 'codethilo', (err, decoded) => {
      if (err) {
        return res.status(200).json({
          err: 0,
          message: 'Không tồn tại giá trị xác thực'
        })
      }

      if (!decoded.existUser) {
        return res.status(200).json({
          err: 0,
          message: 'Không tồn tại giá trị xác thực'
        })
      }

      return res.status(200).json({
        err: 1,
        message: 'ok',
        data: {
          loggedInUser: decoded.existUser
        }
      })
    })
  } catch (error) {
    return res.status(400).json({ err: 0, message: 'Lỗi xác thực' })
  }
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

const handleLogoutUser = async (req, res) => {
  res.clearCookie('token', {
    path: '/'
  })
  return res.status(200).redirect('http://localhost:3000/dang-nhap')
}

const handleGetAllBorrow = async (req, res) => {
  const userId = req.params.id
  try {
    const response = await borrowModel.findAll({
      where: { userId: userId }, // Điều kiện lọc theo userId
      include: [
        {
          model: bookModel, // Liên kết với model sách
          as: 'book', // Alias đã đặt trong quan hệ
          attributes: ['name', 'imgBook', 'creatorBook', 'publisherBook'] // Các trường muốn lấy từ sách
        }
      ]
    })

    return res.json(response)
  } catch (error) {
    console.error(error) // Log lỗi để kiểm tra
    res.status(500).json({ error: error })
  }
}

const handleUpdatePassword = async (req, res) => {
  const { userId, oldPassword, newPassword } = req.body

  if (!oldPassword || !newPassword) {
    return res.status(200).json({ message: 'Dữ liệu không hợp lệ!' })
  }

  const existUser = await userModel.findOne({
    where: { id: userId }
  })

  if (!existUser) {
    return res.status(200).json({ message: 'Cập nhập mật khẩu thất bại!' })
  }

  const isPasswordValid = await bcrypt.compare(oldPassword, existUser.passWord)

  if (!isPasswordValid) {
    return res.status(200).json({
      message: 'Mật khẩu cũ không chính xác!'
    })
  }

  const hashedPassword = await bcrypt.hash(newPassword, 10)

  const isUpdatePassword = await userModel.update(
    {
      passWord: hashedPassword
    },
    { where: { id: userId } }
  )

  if (!isUpdatePassword) {
    return res.status(200).json({ message: 'Cập nhật mật khẩu thất bại!' })
  }

  return res.status(200).json({
    message: 'Cập nhật mật khẩu thành công!'
  })
}

export default {
  handleLogin,
  handleLogout,
  getInfoUser,
  handleLogoutUser,
  handleGetAllBorrow,
  handleUpdatePassword
}
