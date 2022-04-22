const { Category } = require('../../models/category');
const mongoose = require('mongoose');

let category = {}

category.categoryList = async (req, res) => {
    try{
        const categories = await Category.find();
        res.json({
            data: {
                categories,
            },
            message: "Successfully retrived!",
            error: false
        })
    }catch(err){
        res.status(500).json({
            message: "There was a server side error!",
            error: true
        })
    }
    
}
category.createCategory = async (req, res) => {
    
    const newCategory = new Category({...req.body});
    try{
        const category = await newCategory.save();
        res.json({
            data: {
                category: category
            },
            message: "Category was added successfully!",
            error: false
        })
    }catch(err){
        res.status(500).json({
            message: "There was a server side error!",
            error: true
        })
    }
    
}
category.showCategory = async (req, res) => {
    try{
        // const category = await Category.findById(req.params.id);
        const category = await Category.aggregate([
            { $match: { _id: new mongoose.Types.ObjectId(req.params.id)  } },
            {
                $lookup: {
                from: "products",
                localField: "_id",
                foreignField: "category",
                as: "products",
                },
            },
            // {$unwind: "$profile" },
        ]);
        if (category) {
            res.json({
                data: {
                    category
                },
                message: "Successfully retrieved!",
                error: false
            })
        } else {
            res.json({
                message: "Invalid category id!",
                error: true
            })
        }
    }catch(err){
        res.status(500).json({
            message: "There was a server side error!",
            error: true
        })
    }
    
}
category.updateCategory = async (req, res) => {
    
    try {
        
        const category = await Category.findByIdAndUpdate(
            req.params.id,
            {
                $set: {...req.body}
            },
            { new: true });
        res.json({
            data: {
                category,
            },
            message: "Category was updated suceesfully!",
            error: false
        })
    }catch(err){
        res.status(500).json({
            message: "There was a server side error!",
            error: true
        })
    }
    
}
category.removeCategory = async (req, res) => {
    try{
        const category = await Category.findByIdAndDelete(req.params.id);
        res.json({
            data: {
                category,
            },
            message: "Category was deleted suceesfully!",
            error: false
        })
    }catch(err){
        res.status(500).json({
            message: "There was a server side error!",
            error: true
        })
    }
    
}



module.exports = category;