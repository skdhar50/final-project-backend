const { forEach } = require('lodash');
const { Offer } = require('../../models/offer');
const { Product } = require('../../models/product');
const { base64Decode } = require('../../utilities/base64');

let offer = {};

offer.offerList = async (req, res) => {
    try {
        const offers = await Offer
            .find()
            // .populate('category', 'name')
            // .populate('brand', 'name')
            .populate('products', 'name price photos');
        
        res.json({
            data: {
                offers,
            },
            message: "Successfully retrievied!",
            error: false,
        })
    } catch (err) {
        console.log(err);
        res.status(500).json({
            message: "There was a server side error!",
            error: true
        })
    }
}
offer.showOffer = async (req, res) => {
    try {
        const offer = await Offer
            .findById(req.params.id);
            // .populate('category', 'name')
            // .populate('brand', 'name',)
            // .populate('products', 'name price photos brand');
        

        let productsDetails = [];
        offer.products = await Product.find({ '_id': { $in: offer['products'] } })
            .populate('brand', 'name')
            .populate('category', 'name')
            .sort({ _id: -1 });
        res.json({
            data: {
                offer
            },
            message: "Successfully retrievied!",
            error: false,
        })
    } catch (err) {
        res.status(500).json({
            message: "There was a server side error!",
            err: err,
            error: true
        })
    }
}
offer.createOffer = async (req, res) => {
    // res.send(req.body)
    if (req.body.hasOwnProperty('photo')) {
        req.body.photo = base64Decode(req.body.photo, 'OFFER');
    }
    // base64Decode
    const newOffer = new Offer({
        ...req.body
    })
    try {
        const offer = await newOffer.save();
        res.json({
            data: {
                offer
            },
            message: "offer was added successfully!",
            error: false,
        })
    } catch (err) {
        res.status(500).json({
            message: "There was a server side error!",
            error: true
        })
    }
}
offer.updateOffer = async (req, res) => {
    try {
        const offer = await Offer.findByIdAndUpdate(
            req.params.id,
            { $set: { ...req.body } },
            { new: true }
        );
        res.json({
            data: {
                offer
            },
            message: "offer was updated successfully!",
            error: false,
        })
    } catch (err) {
        res.status(500).json({
            message: "There was a server side error!",
            error: true
        })
    }
}
offer.removeOffer = async (req, res) => {
    try {
        res.json({
            data: {
                offer: await Offer.findByIdAndDelete(req.params.id),
            },
            message: "offer was deleted successfully!",
            error: false,
        })
    } catch (err) {
        res.status(500).json({
            message: "There was a server side error!",
            error: true
        })
    }
}


module.exports = offer;