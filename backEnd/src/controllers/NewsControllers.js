import newsModels from "../models/NewsModels.js";
import cloudinary from "../utils/cloudinary.js";
import multer from "../middleware/multer.js";

const getNewsPage =async (req, res) => {
    const limit = 10;
    const search = req.query.search ? req.query.search : '';
    const sort = req.query.sort ? req.query.sort : 'desc';
    const currentPage = req.query.page ? req.query.page : 1;
    let getTotalNews = await newsModels.getTotalNews(search,sort);
    const totalPage = Math.ceil(getTotalNews[0]['count(id)'] / limit);
    const start = (currentPage - 1) * limit
    let listNews = await newsModels.getAllNews(search, sort, start, limit);  
     
         
    return res.render("layout", {data: {title: 'Tin tức', messages: req.flash('error'), page: 'news', row: listNews, currentPage: parseInt(currentPage), totalPage: parseInt(totalPage), sort: sort, search: search, limit: limit }});
}

const createNews = async (req, res) => {
    multer.single('image')
    console.log(multer.single('image'));
    cloudinary.uploader.upload(req.file.path, function (err, result){
        if(err) {
          console.log(err);
          return res.status(500).json({
            success: false,
            message: "Error"
          })
        }
    
        res.status(200).json({
          success: true,
          message:"Uploaded!",
          data: result
        })
      })
    const createdNews = await newsModels.createNews(req.body);
    if (createdNews) {
        req.flash('success', 'Thêm tin tức thành công')
        res.status(201).redirect('/tin-tuc')
        return
    }else{
        req.flash('error', 'Thêm tin tức thất bại')
        res.status(401).redirect('/tin-tuc')
        return
    }
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

export default {getNewsPage, createNews, updateCategory, deleteCategory};