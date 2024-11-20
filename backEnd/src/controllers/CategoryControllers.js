import { bookModel, categoryModel, sequelize } from "../models";
import { Op } from "sequelize";
import { IncomingForm } from "formidable";

const getCategoryPage = async (req, res) => {
  const limit = 5;
  const search = req.query.search ? req.query.search : "";
  const sort = req.query.sort ? req.query.sort : "desc";
  const currentPage = req.query.page ? req.query.page : 1;

  const whereConditions = {
    name: {
      [Op.like]: `%${search}%`,
    },
  };

  const totalCategoryQuery = `
    SELECT COUNT(*) AS total
    FROM categories AS category
    WHERE category.name LIKE :search
  `;
  const totalCategoryResult = await sequelize.query(totalCategoryQuery, {
    replacements: { search: `%${search}%` },
    type: sequelize.QueryTypes.SELECT,
  });
  const totalCategory = totalCategoryResult[0].total;
  const totalPage = Math.ceil(totalCategory / limit);
  const start = (currentPage - 1) * limit;

  // Truy vấn danh mục với số lượng sách, phân trang, tìm kiếm và sắp xếp
  const listCategoryQuery = `
    SELECT 
      category.id, 
      category.name, 
      category.description, 
      SUM(book.count) AS bookCount
    FROM
      categories AS category
    LEFT JOIN 
      books AS book ON category.id = book.categoryId
    WHERE 
      category.name LIKE :search
    GROUP BY 
      category.id
    ORDER BY 
      category.id ${sort}
    LIMIT :limit OFFSET :start
  `;
  const listCategoryResult = await sequelize.query(listCategoryQuery, {
    replacements: {
      search: `%${search}%`,
      limit: limit,
      start: start,
    },
    type: sequelize.QueryTypes.SELECT,
  });

  return res.render("layout", {
    data: {
      title: "Quản lý thể loại",
      messageError: req.flash("error"),
      messageSuccess: req.flash("success"),
      page: "category",
      row: listCategoryResult,
      currentPage: parseInt(currentPage),
      totalPage: parseInt(totalPage),
      sort,
      search,
      limit,
    },
  });
};

const addCategory = async (req, res) => {
  const form = new IncomingForm();

  form.parse(req, async (err, fields, files) => {
    if (err) {
      console.error("Error parsing form:", err);
      req.flash("error", "Có lỗi xảy ra khi xử lý form!");
      return res.status(400).redirect("/the-loai");
    }

    try {
      // Lấy dữ liệu từ form
      const nameCategory = fields.nameCategory[0];
      const descriptionCategory = fields.descriptionCategory[0];

      // Kiểm tra dữ liệu đầu vào
      if (!nameCategory || !descriptionCategory) {
        throw new Error("Tên thể loại và mô tả không được để trống");
      }

      // Kiểm tra trùng tên thể loại
      const categoryExists = await categoryModel.findOne({
        where: { name: nameCategory },
      });

      if (categoryExists) {
        throw new Error("Thể loại đã tồn tại trong hệ thống");
      }

      // Tạo thể loại mới
      const newCategory = await categoryModel.create({
        name: nameCategory,
        description: descriptionCategory,
      });

      if (!newCategory) {
        throw new Error("Thêm thể loại thất bại");
      }

      // Thành công
      req.flash("success", "Thêm thể loại thành công");
      return res.status(201).redirect("/the-loai");
    } catch (error) {
      // Quăng lỗi và xử lý
      console.error("Error adding category:", error.message);
      req.flash("error", error.message || "Lỗi hệ thống!");
      return res.status(400).redirect("/the-loai");
    }
  });
};

const deleteCategory = async (req, res) => {
  try {
    const categoryId = req.params.id;

    // Kiểm tra nếu không có categoryId, ném lỗi
    if (!categoryId) {
      throw new Error("ID thể loại không hợp lệ hoặc không được cung cấp");
    }

    // Xóa thể loại dựa trên ID
    const deletedRows = await categoryModel.destroy({
      where: { id: categoryId },
    });

    // Nếu không có bản ghi nào được xóa
    if (deletedRows === 0) {
      throw new Error("Không tìm thấy thể loại với ID được cung cấp");
    }

    // Thành công
    req.flash("success", "Xóa thể loại thành công!");
    return res.status(200).json({ message: "Xóa thể loại thành công!" });
  } catch (error) {
    // Xử lý lỗi
    req.flash("error", error.message || "Có lỗi xảy ra khi xóa thể loại!");
    return res
      .status(400)
      .json({ message: error.message || "Xóa thể loại thất bại!" });
  }
};

const updateCategory = async (req, res) => {
  try {
    const categoryId = req.params.id;
    const { nameCategory, descriptionCategory } = req.body;

    // Kiểm tra nếu không có ID hoặc dữ liệu đầu vào không hợp lệ
    if (!categoryId) {
      throw new Error("ID thể loại không hợp lệ hoặc không được cung cấp!");
    }

    if (!nameCategory || !descriptionCategory) {
      throw new Error("Tên và mô tả thể loại không được để trống!");
    }

    // Tìm thể loại cần cập nhật
    const category = await categoryModel.findOne({
      where: { id: categoryId },
    });

    if (!category) {
      throw new Error("Thể loại không tồn tại!");
    }

    // Thực hiện cập nhật thông tin thể loại
    const [updatedRows] = await categoryModel.update(
      {
        name: nameCategory,
        description: descriptionCategory,
      },
      {
        where: { id: categoryId },
      }
    );

    // Kiểm tra nếu không có bản ghi nào được cập nhật
    if (updatedRows === 0) {
      throw new Error("Cập nhật thể loại thất bại!");
    }

    // Thành công
    req.flash("success", "Cập nhật thể loại thành công!");
    return res.status(200).json({ message: "Cập nhật thể loại thành công!" });
  } catch (error) {
    // Xử lý lỗi
    req.flash("error", error.message || "Có lỗi xảy ra khi cập nhật thể loại!");
    return res
      .status(400)
      .json({ message: error.message || "Cập nhật thể loại thất bại!" });
  }
};

export default { getCategoryPage, addCategory, deleteCategory, updateCategory };
