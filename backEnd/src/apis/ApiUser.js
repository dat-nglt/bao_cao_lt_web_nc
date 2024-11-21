import { userModel, borrowModel, bookModel } from "../models";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

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

    const isPasswordValid = await bcrypt.compare(password, existUser.passWord);

    if (!isPasswordValid) {
      return res.status(200).json({
        message: "Mật khẩu không chính xác",
        logined: false,
      });
    }

    existUser.passWord = undefined;

    const token = jwt.sign({ existUser }, SECRET_KEY, { expiresIn: "1h" });
    if (!token) {
      return res.status(200).json({
        message:
          "Có lỗi trong quá trình đăng nhập, vui lòng thử lại (tokenError)",
        logined: false,
      });
    }

    res.cookie("token", token, {
      httpOnly: true,
      path: "/",
      maxAge: 60 * 60 * 1000,
    });

    return res.status(200).json({
      message: token,
      logined: true,
      user: token,
    });
  } catch (error) {
    return res.status(200).json({
      message: error,
      logined: false,
    });
  }
};

const getInfoUser = async (req, res) => {
  try {
    const token = req.cookies.token;

    if (!token) {
      return res.status(200).json({
        err: 0,
        message: "Không tồn tại giá trị xác thực",
      });
    }

    jwt.verify(token, "codethilo", (err, decoded) => {
      if (err) {
        return res.status(200).json({
          err: 0,
          message: "Không tồn tại giá trị xác thực",
        });
      }

      if (!decoded.existUser) {
        return res.status(200).json({
          err: 0,
          message: "Không tồn tại giá trị xác thực",
        });
      }

      return res.status(200).json({
        err: 1,
        message: "ok",
        data: {
          loggedInUser: decoded.existUser,
        },
      });
    });
  } catch (error) {
    return res.status(400).json({ err: 0, message: "Lỗi xác thực" });
  }
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

const handleLogoutUser = async (req, res) => {
  res.clearCookie("token", {
    path: "/",
  });
  return res.status(200).redirect("http://localhost:3000/dang-nhap");
};

const handleGetAllBorrow = async (req, res) => {
  const userId = req.params.id;
  try {
    const response = await borrowModel.findAll({
      where: { userId: userId }, // Điều kiện lọc theo userId
      include: [
        {
          model: bookModel, // Liên kết với model sách
          as: "book", // Alias đã đặt trong quan hệ
          attributes: ["name", "imgBook", "creatorBook", "publisherBook"], // Các trường muốn lấy từ sách
        },
      ],
    });

    return res.json(response);
  } catch (error) {
    console.error(error); // Log lỗi để kiểm tra
    res.status(500).json({ error: error });
  }
};

const updatePassword = async (req, res) => {
  const {password, newPassword, userId} = req.body
}

export default {
  handleLogin,
  handleLogout,
  getInfoUser,
  handleLogoutUser,
  handleGetAllBorrow,
};
