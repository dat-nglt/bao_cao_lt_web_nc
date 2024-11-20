import { userModel } from "../models";
import bcrypt from "bcrypt";

const handleLogin = async (req, res) => {
  const SECRET_KEY = process.env.JWT_SECRET || "defaultSecretKey";

  const { username, password } = req.body;

  try {
    if (!username || !password) {
      return res.status(200).json({
        message: "Tài khoản và mật khẩu không được để trống",
        logined: false,
      });
    }

    const existUser = await userModel.findOne({
      where: { studentCode: username },
    });

    if (!existUser) {
      return res
        .status(200)
        .json({ message: "Tài khoản không tồn tại", logined: false });
    }

    // Kiểm tra mật khẩu nhập vào so với mật khẩu đã mã hóa
    // bcrypt.compare(password, existUser.passWord, (err, result) => {
    //   if (err) {
    //     return res.status(500).json({
    //       message: "Đã xảy ra lỗi khi so sánh mật khẩu.",
    //       error: err
    //     });
    //   }

    //   if (!result) {
    //     // Nếu mật khẩu không khớp
    //     return res.status(200).json({
    //       message: "Mật khẩu không chính xác",
    //       logined: false,
    //       user: existUser
    //     });
    //   }

    //   // Nếu mật khẩu khớp
    //   return res.status(200).json({
    //     message: "Đăng nhập thành công",
    //     logined: true,
    //     user: existUser
    //   });
    // });

    if (password !== existUser.passWord) {
      return res.status(200).json({
        message: "Mật khẩu không chính xác",
        logined: true,
        user: existUser,
      });
    }

    return res.status(200).json({
      message: "Đăng nhập thành công",
      logined: true,
      user: existUser,
    });
  } catch (error) {}
};

const handleLogout = async (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      return res.status(500).redirect("/dang-nhap");
    }
    req.flash("success", "Đăng xuất thành công");
    return res.status(200).redirect("/dang-nhap");
  });
};

export default { handleLogin, handleLogout };
