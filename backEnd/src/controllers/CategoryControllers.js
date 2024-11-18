import categoryModel from "../models/CategoryModels";

const getCategoryPage =async (req, res) => {
   
    return res.render("layout", {data: {title: 'Thể loại', page: 'category'}});
}


export default {getCategoryPage};