import newsModels from "../models/NewsModels.js";

const getNewsPage =async (req, res) => {
    const search = req.query.search;
    const sort = req.query.sort;
    let page = req.query.page;
    if(!page){
        page = 0;
    }
    let getTotalNews = await newsModels.getTotalNews(search,sort);
    console.log(getTotalNews);
    
    let listNews = await newsModels.getAllNews(search,sort);
    return res.render("layout", {data: {title: 'Tin tức', page: 'news', row: listNews}});
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

export default {getNewsPage, addCategory, updateCategory, deleteCategory};