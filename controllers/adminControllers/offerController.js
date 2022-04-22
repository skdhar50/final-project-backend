const { Offer } = require('../../models/offer');

let offer = {};

offer.offerList = async (req, res) => {
    try {
        const offers = await Offer
            .find()
            .populate('category', 'name')
            .populate('brand', 'name')
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
            .findById(req.params.id)
            .populate('category', 'name')
            .populate('brand', 'name')
            .populate('products', 'name price photos');
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
            error: true
        })
    }
}
offer.createOffer = async (req, res) => {
    // res.send(req.body)
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