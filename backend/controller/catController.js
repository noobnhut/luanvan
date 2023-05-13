const db = require('../models');
const Cat = db.Category;
const Post = db.Post;
const getAllCat = async (req, res) => {
    try {
        const cat = await Cat.findAll();
        res.json(cat);
    } catch (error) {
        res.json("không lấy được danh mục ");
        console.log(error);
    }
};


const addCat = async (req, res) => 
{
    const {id,cat_name} = req.body;
    try {
      const existingCat = await Cat.findOne({ where: { cat_name } });
        if(existingCat)
        {
            return res.json({ message: "Trùng danh mục không thể thêm "  });
        }
        if (cat_name=='') {
            res.json({ message: "Thiếu thông tin danh mục "  });
            return;
        } 
        else
        {
            const cat = await Cat.create( {id,cat_name} );
         res.json({ message: " Thêm thành công "  });

        }
    } catch (error) {
        return res.status(401).json({ message: "Không thể thêm danh mục" });
    }

}

const updateCat = async (req, res) => {

    const existingPost = await Post.findOne({ where: { id_cat: req.params.id } });
    const { cat_name } = req.body;

    try {
        const existingCat = await Cat.findOne({ where: { cat_name } });
        if (cat_name == '') {
            res.status(201).json({ message: "Dữ liệu không thể rỗng" });
        }
        else if (existingCat && existingCat.id != req.params.id) {
            res.status(202).json({ message: "Dữ liệu trùng lặp" });
        }
        else if (existingPost) {
            return res.status(202).json({ message: "danh mục đang dùng không thể update" });
        }
        else {
            await Cat.update({ cat_name }, { where: { id: req.params.id } });
            res.status(200).json({ message: "Cập nhật thành công" });
        }

    } catch (error) {
        return res.status(401).json({ message: "Không thể câp nhập danh mục" });
    }
};

const deleteCat = async (req, res) => {
    const existingPost = await Post.findOne({ where: { id_cat: req.params.id } });
    const cat = await Cat.findOne({
        where: {
            id: req.params.id
        }
    });
    if (!cat) return res.status(404).json({ message: "Không tìm thấy dữ liệu nào" });

    try {
        if (existingPost) {
            return res.status(202).json({ message: "danh mục đang dùng không thể delete" });
        }
        else {
            await Cat.destroy({
                where: {
                    id: req.params.id
                }
            });
        }
        res.status(200).json({ message: "Xóa danh mục thành công" });
    } catch (error) {
        console.log(error.message);
    }
};

module.exports = {
    getAllCat,
    addCat,
    updateCat,
    deleteCat
};
