import { userModel } from "../models";
import bcrypt from "bcrypt";
import { Op } from "sequelize";

const getLoginPage = async (req, res) => {
  return res.render("login", {
    data: {
      messageError: req.flash("error"),
      messageSuccess: req.flash("success"),
    },
  });
};

const getUserPage = async (req, res) => {
  const limit = 5;
  const search = req.query.search ? req.query.search : "";
  const sort = req.query.sort ? req.query.sort : "desc";
  const currentPage = req.query.page ? req.query.page : 1;
  const whereConditions = {
    [Op.or]: [
      { studentCode: { [Op.eq]: search } },
      { fullName: { [Op.like]: `%${search}%` } },
    ],
    roleAccess: {
      [Op.in]: [0, 1],
    },
  };
  const totalContact = await userModel.findAll({
    raw: true,
    where: whereConditions,
  });
  const totalPage = Math.ceil(totalContact.length / limit);
  const start = (currentPage - 1) * limit;
  const listUser = await userModel.findAll({
    raw: true,
    where: whereConditions,
    order: [["id", sort]],
    limit: limit,
    offset: start,
  });
  return res.render("layout", {
    data: {
      title: "Quản lý độc giả",
      messageError: req.flash("error"),
      messageSuccess: req.flash("success"),
      page: "user",
      row: listUser,
      currentPage: parseInt(currentPage),
      totalPage: parseInt(totalPage),
      sort,
      search,
      limit,
    },
  });
};

const getUserById = async (req, res) => {
  const { id } = req.params; // Lấy ID từ tham số URL

  try {
    const user = await userModel.findByPk(id);

    if (!user) {
      return res.status(404).json({ error: "không tìm thấy nguời dùng." });
    }
    res.json(user);
  } catch (error) {
    res.status(500).json({ error: "Có lỗi xảy ra." });
  }
};

const handleLogin = async (req, res) => {
  const { adminAccount, adminPassword } = req.body;
  if (!adminAccount || !adminPassword) {
    req.flash("error", "Tên tài khoản và mật khẩu không được để trống");
    return res.status(400).redirect("/dang-nhap");
  }

  const existUser = await userModel.findOne({
    where: { studentCode: adminAccount },
  });

  if (!existUser) {
    req.flash("error", "Tên tài khoản không tồn tại, vui lòng kiểm tra lại");
    return res.status(400).redirect("/dang-nhap");
  }

  const isPasswordValid = await bcrypt.compare(
    adminPassword,
    existUser.dataValues.passWord
  );

  if (!isPasswordValid) {
    req.flash("error", "Mật khẩu không chính xác, vui lòng kiểm tra lại");
    return res.status(400).redirect("/dang-nhap");
  }

  if (existUser.dataValues.roleAccess !== 2) {
    req.flash(
      "error",
      "Vui lòng sử dụng tài khoản quản trị viên để truy cập hệ thống!"
    );
    return res.status(200).redirect("/dang-nhap");
  }

  req.session.admin = existUser.dataValues;
  req.flash("success", "Đăng nhập thành công");
  return res.status(200).redirect("/the-loai");
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

const addUser = async (req, res) => {
  try {
    const {
      studentCode,
      passWord,
      fullName,
      dateOfBirth,
      addressUser,
      phoneNumber,
      email,
      identificationNumber,
    } = req.body;
    console.log("--------------------------------------------------");

    if (!studentCode || !passWord || !fullName) {
      req.flash(
        "error",
        "Vui lòng nhập đầy đủ mã sinh viên, mật khẩu và họ tên."
      );
      return res.status(400).redirect("/doc-gia");
    }
    const existingUser = await userModel.findOne({ where: { studentCode } });
    if (existingUser) {
      req.flash("error", "Mã sinh viên đã tồn tại. Vui lòng kiểm tra lại.");
      return res.status(400).redirect("/doc-gia");
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

    req.flash("success", "Thêm độc giả thành công!");
    return res.status(200).redirect("/doc-gia");
  } catch (error) {
    console.error("Lỗi khi thêm độc giả:", error);
    req.flash("error", "Có lỗi xảy ra. Vui lòng thử lại.");
    return res.status(500).redirect("/doc-gia");
  }
};

const updateUser = async (req, res) => {
  try {
    const {
      idUpdate,
      studentCodeUpdate,
      fullNameUpdate,
      dateOfBirthUpdate,
      identificationNumberUpdate,
      phoneNumberUpdate,
      emailUpdate,
      addressUserUpdate,
      passwordUpdate, // New field for password
    } = req.body;

    // Kiểm tra dữ liệu đầu vào
    if (!studentCodeUpdate || !fullNameUpdate) {
      req.flash("error", "Vui lòng nhập đầy đủ mã sinh viên, họ tên.");
      return res.status(400).redirect("/doc-gia");
    }

    // Kiểm tra xem mã sinh viên hoặc số định danh đã tồn tại hay chưa
    const existingUser = await userModel.findOne({
      where: {
        [Op.or]: [
          { studentCode: studentCodeUpdate },
          { identificationNumber: identificationNumberUpdate },
        ],
        id: { [Op.ne]: idUpdate }, // Đảm bảo không phải người dùng hiện tại
      },
    });

    if (existingUser) {
      req.flash("error", "Mã sinh viên hoặc số định danh đã tồn tại.");
      return res.status(400).redirect("/doc-gia");
    }

    // Chuẩn bị các trường để cập nhật
    const updatedFields = {
      studentCode: studentCodeUpdate,
      fullName: fullNameUpdate,
      dateOfBirth: dateOfBirthUpdate,
      identificationNumber: identificationNumberUpdate,
      phoneNumber: phoneNumberUpdate,
      email: emailUpdate,
      addressUser: addressUserUpdate,
    };

    // Cập nhật mật khẩu chỉ khi có giá trị mới
    if (passwordUpdate) {
      const hashedPassword = await bcrypt.hash(passwordUpdate, 10); // Băm mật khẩu mới
      updatedFields.passWord = hashedPassword; // Đảm bảo trường này khớp với tên trường trong cơ sở dữ liệu
    }

    // Cập nhật thông tin người dùng
    await userModel.update(updatedFields, {
      where: { id: idUpdate },
    });

    req.flash("success", "Cập nhật thông tin người dùng thành công!");
    return res.status(200).redirect("/doc-gia");
  } catch (error) {
    console.error("Lỗi khi cập nhật thông tin người dùng:", error);
    req.flash("error", "Có lỗi xảy ra. Vui lòng thử lại.");
    return res.status(500).redirect("/doc-gia");
  }
};

const lockEndUnLockUser = async (req, res) => {
  try {
    const { id } = req.params;
    if (!id) {
      return res.status(400).redirect("/doc-gia");
    }
    const user = await userModel.findOne({ where: { id } });
    if (!user) {
      return res.status(404).redirect("/doc-gia");
    }
    user.roleAccess = user.roleAccess === 0 ? 1 : 0;
    await user.save();

    return res.status(200).redirect("/doc-gia");
  } catch (error) {
    console.error("Lỗi khi cập nhật vai trò độc giả:", error);
    return res.status(500).redirect("/doc-gia");
  }
};

export default {
  getLoginPage,
  handleLogin,
  handleLogout,
  getUserPage,
  addUser,
  lockEndUnLockUser,
  getUserById,
  updateUser,
};
