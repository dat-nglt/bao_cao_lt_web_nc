import categoryModel from "../models/CategoryModels";

const getCategoryPage =async (req, res) => {
    let listCategory = await categoryModel.getAllCategory();
    return res.render("layout", {data: {title: 'Thể loại', page: 'category', row: listCategory}});
}

const addCategory = async (req, res) => {
    await categoryModel.createCategory(req.body);
    res.redirect("/the-loai");
}

const updateCategory = (req, res) => {
    return res.render("layout", {data: {title: 'category', page: 'category'}});
}

const deleteCategory = async (req, res) => {
    try {
        await categoryModel.deleteCategory(req.params.id);
        res.status(204).send();
    } catch (error) {
        res.status(500).send(error);
    }
};

export default {getCategoryPage, addCategory, updateCategory, deleteCategory};