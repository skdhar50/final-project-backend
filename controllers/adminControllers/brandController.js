const { Brand } = require('../../models/brand');
const mongoose = require('mongoose');
const {base64Encrypt} = require('../../utilities/base64');

let brand = {}

brand.brandList = async (req, res) => {
    try{
        const brands = await Brand.find();
        res.json({
            data: {
                brands: brands,
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
brand.createBrand = async (req, res) => {
    let inputData = {}
    if (req.body.hasOwnProperty('icon')) {
        inputData = {
            "name": req.body.name,
            "icon": base64Encrypt(req.body.icon),
        }
    } else {
        inputData = {
            "name": req.body.name,
        }
    }
    const newBrand = new Brand({...inputData});
    try{
        const brand = await newBrand.save();
        res.json({
            data: {
                brand: brand
            },
            message: "Brand was added successfully!",
            error: false
        })
    }catch(err){
        res.status(500).json({
            message: "There was a server side error!",
            error: true
        })
    }
    
}
brand.showBrand = async (req, res) => {
    try{
        // const brand = await Brand.findById(req.params.id);
        const brand = await Brand.aggregate([
            { $match: { _id: new mongoose.Types.ObjectId(req.params.id)  } },
            {
                $lookup: {
                from: "products",
                localField: "_id",
                foreignField: "brand",
                as: "products",
                },
            },
            // {$unwind: "$profile" },
        ]);
        if (brand) {
            res.json({
                data: {
                    brand: brand
                },
                message: "Successfully retrieved!",
                error: false
            })
        } else {
            res.json({
                message: "Invalid brand id!",
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
brand.updateBrand = async (req, res) => {
    let inputData = {}
    if (req.body.hasOwnProperty('icon')) {
        inputData = {
            "name": req.body.name,
            "status": req.body.status,
            "icon": base64Encrypt(req.body.icon),
        }
    } else {
        inputData = {
            "name": req.body.name,
            "status": req.body.status,
        }
    }
    try {
        
        const brand = await Brand.findByIdAndUpdate(
            req.params.id,
            {
                $set: {...inputData}
            },
            { new: true });
        res.json({
            data: {
                brand,
            },
            message: "Brand was updated suceesfully!",
            error: false
        })
    }catch(err){
        res.status(500).json({
            message: "There was a server side error!",
            error: true
        })
    }
    
}
brand.removeBrand = async (req, res) => {
    try{
        const brand = await Brand.findByIdAndDelete(req.params.id);
        res.json({
            data: {
                brand,
            },
            message: "Brand was deleted suceesfully!",
            error: false
        })
    }catch(err){
        res.status(500).json({
            message: "There was a server side error!",
            error: true
        })
    }
    
}



module.exports = brand;