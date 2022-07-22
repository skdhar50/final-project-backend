const { Product } = require('../../models/product');
const { Review } = require('../../models/review');
const {base64Decode} = require('../../utilities/base64');
const { totalSale } = require('../../utilities/productHelpers');

let product = {}

product.createProduct = async (req, res) => {
    
    let inputData = {}
    if (req.body.hasOwnProperty('photos')) {
        let photos = [];
        req.body.photos.forEach((photo) => {
            photos.push(base64Decode(photo, 'PRODUCT'))
        })
        inputData = {
            ...req.body,
            photos: photos
        };
    } else {
        inputData = {...req.body};
    }
    // res.json({ ...req.body });
    try {
        const newProduct = new Product({
            ...inputData, totalSell:0
        });
        const product = await newProduct.save();
        
        res.json({
            data:{
                product,
            },
            message:"Product was added successfully!",
            error: false
        })
    }catch(err){
        res.status(500).json({
            message: "There was a server side error!",
            error: true
        })
    }
}

product.productList = async (req, res) => {
    try {
        const products = await Product
            .find()
            .populate('category', 'name')
            .populate('brand', 'name')
            .sort({ _id: -1 });
        
        res.json({
            data:{
                products: products,
            },
            message:"Successfully retrived!",
            error: false
        })
    }catch(err){
        res.status(500).json({
            message: "There was a server side error!",
            error: true
        })
    }
}

product.showProduct = async (req, res) => {
    try {
        let product = await Product
            .findById(req.params.id)
            .populate('brand', 'name')
            .populate('category', 'name');
        
        product._doc.totalSale = await totalSale(req.params.id);
        product._doc.reviews = await Review.where('product')
            .equals(req.params.id)
            .populate('user', 'name');

        res.json({
            data:{
                product
            },
            message:"Successfully retrived!",
            error: false
        })
    }catch(err){
        res.status(500).json({
            message: "There was a server side error!",
            error: true
        })
    }
}
product.updateProduct = async (req, res) => {
    delete req.body.photos;
    try {
        
        const product = await Product.findByIdAndUpdate(
            req.params.id,
            {
                $set: {...req.body}
            },
            { new: true });
        res.json({
            data: {
                product,
            },
            message: "Product was updated suceesfully!",
            error: false
        })
    }catch(err){
        res.status(500).json({
            message: "There was a server side error!",
            error: true
        })
    }
}

product.removeProduct = async (req, res) => {
    try {
        const product = await Product.findByIdAndDelete(req.params.id);
        res.json({
            data:{
                product,
            },
            message:"Product was deleted successfully!",
            error: false
        })
    }catch(err){
        res.status(500).json({
            message: "There was a server side error!",
            error: true
        })
    }
}

product.addPhotos = async (req, res) => {
    
    try {
        const selectProduct = await Product.findById(req.params.id);

        let photos = [...selectProduct.photos];
        req.body.photos.forEach(photo => {
            photos.push(base64Decode(photo))
        })

        const product = await Product.findByIdAndUpdate(
            req.params.id,
            {
                $set: {"photos": photos}
            },
            { new: true });
        res.json({
            data: {
                photos:product.photos,
            },
            message: "Photos were added succesfully!",
            error: false
        })

    } catch (error) {
        res.status(500).json({
            message: "There was a server side error!",
            error: true
        })
    }
}
product.removePhoto = async (req, res) => {
    try {
        const selectProduct = await Product.findById(req.params.id);

        let photos = selectProduct.photos.filter(item => item !== req.params.photo);

        const product = await Product.findByIdAndUpdate(
            req.params.id,
            {
                $set: {"photos": photos}
            },
            { new: true });
        res.json({
            data: {
                photos:product.photos,
            },
            message: "Photo was removed succesfully!",
            error: false
        })

    } catch (error) {
        res.status(500).json({
            message: "There was a server side error!",
            error: true
        })
    }
    
}

module.exports = product;