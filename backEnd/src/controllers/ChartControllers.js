import borrowModel from "../models/BorrowModels.js";
import userModel from "../models/UserModels.js";
import { sequelize } from '../models/index.js';
import { Op } from "sequelize";

// Hàm thống kê
const getBorrowStatistics = async (req, res) => { // Thêm req, res vào tham số
  try {
    const statistics = await borrowModel.findAll({
      attributes: [
        "status",
        [sequelize.fn("COUNT", sequelize.col("status")), "count"],
      ],
      group: ["status"],
      raw: true,
    });

    const statusLabels = {
      1: "Chờ xét duyệt",
      2: "Đang mượn",
      3: "Đã trả",
      4: "Quá hạn",
      5: "Từ chối",
    };

    // Chuyển đổi để có định dạng dễ đọc
    const formattedStatistics = statistics.map(stat => ({
      label: statusLabels[stat.status],
      count: parseInt(stat.count, 10),
    }));


    const userStatistics = await userModel.findAll({
      attributes: [
        "roleAccess",
        [sequelize.fn("COUNT", sequelize.col("roleAccess")), "count"],
      ],
      where: {
        roleAccess: {
          [Op.or]: [0, 1], 
        },
      },
      group: ["roleAccess"],
      raw: true,
    });

    // Định dạng lại thống kê người dùng
    const roleAccessLabels = {
      0: "Tạm khóa",
      1: "Đang hoạt động",
      // Thêm các giá trị khác nếu có
    };

    const formattedUserStatistics = userStatistics.map(stat => ({
      label: roleAccessLabels[stat.roleAccess],
      count: parseInt(stat.count, 10),
    }));

    return res.render("layout", {
      data: {
        messageError: req.flash("error"),
        messageSuccess: req.flash("success"),
        page: "chart",
        book: formattedStatistics,
        user: formattedUserStatistics
      },
    });
  } catch (error) {
    console.error("Error fetching borrow statistics:", error);
    req.flash("error", "Không thể lấy dữ liệu thống kê."); // Thêm thông báo lỗi
    return res.redirect("/thong-ke"); // Chuyển hướng về trang lỗi hoặc trang khác
  }
};

export default { getBorrowStatistics };